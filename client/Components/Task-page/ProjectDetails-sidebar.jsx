import React, { useContext, useEffect, useState } from "react";
import DropDownMenu from "../Utility/Dropdown";
import { ChangeUserProjectRole, FetchUserWithEmail } from "../../scripts/API/user-data-api";
import { AddMemberToProject, NukeProject, RemoveMemberFromProject } from "../../scripts/API/user-projects";
import MemberContext from "../../Context/ProjectMemberContext";
import { useAuthContext } from "../../Context/AuthorizationContext";
import { useNavigate } from "react-router-dom";

export default function ProjectDetailsSideBar({ project_id = undefined, userRole }) {
    const { projectMembers, RefetchProjectData } = useContext(MemberContext);
    const { currentUser } = useAuthContext();
    const [memberListItems, SetMemberListItems] = useState(null);
    const [bShowAddMember, SetShowAddMember] = useState(false)
    const [searchedUser, setSearchedUser] = useState(false)
    const [txt_msgDisplay, SetTxtMsgDisplay] = useState("");
    const navigate = useNavigate();
    const userRole_strList = ["Viewer", "Member", "Moderator", "Admin"]

    useEffect(() => {
        if (projectMembers && currentUser) {
            let mappedUser = []
            projectMembers.forEach((member, key) => {
                //If member is current user dont add removeButton and dropdown.
                mappedUser.push(<div className="list_members" key={key}><img src={projectMembers.get(key).image_url} /><span>{member.username}</span>
                    {(key !== currentUser.id && userRole >= 2) &&
                        <><div className="menu_role">
                            <DropDownMenu startIndex={member.user_role} items={userRole_strList} OnChange={(index) => ChangeUserRole(index, key)} button={<img src="/client/Images/icon_role.svg" alt="kick" />}></DropDownMenu>
                        </div>
                            <button className="btn_kickUser" onClick={() => HandleRemoveMember(member, key)}><img src="/client/Images/icon_kickUser.svg" alt="kick" /></button>
                        </>
                    }
                </div>);
            });
            SetMemberListItems(mappedUser);
        }
    }, [currentUser, projectMembers]);

    async function ChangeUserRole(index, user_id) {

        if (user_id !== null && project_id !== null) {
            if (index >= 0 && index < 4) {
                const response = await ChangeUserProjectRole(project_id, user_id, index);

                if (response == false) {
                    console.error("Error changing user's role");
                } else
                    RefetchProjectData();
            }
        }
    }

    function CloseSideBar(className) {
        const element = document.getElementsByClassName(className)[0];
        if (element) {
            element.classList.remove("active");
            SetShowAddMember(false);
        }
    }

    async function HandleSearchMember() {
        const element = document.getElementsByClassName("inpt_addMember")[0];

        if (element) {
            if (element.value) {
                //Verify email format(RFC2822)
                let verify = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (verify.test(element.value)) {
                    const user = await FetchUserWithEmail(element.value);
                    if (user) {
                        SetTxtMsgDisplay("User found")
                        setSearchedUser(user);
                    } else {
                        SetTxtMsgDisplay("No user with " + element.value + " exists!");
                    }
                }
            }
        }
    }
    async function HandleAddMember() {
        const email = searchedUser.email;
        const role_level = 0;
        console.log(email, project_id)
        if (email && project_id !== undefined) {
            const response = await AddMemberToProject(project_id, email, role_level);

            if (response) {
                SetTxtMsgDisplay(searchedUser.username + " was added succesfully!");
                RefetchProjectData();
            }
            else {
                SetTxtMsgDisplay("Something went wrong! Error adding user.");
            }
        } else
            console.log("falseeeee")

    }
    async function HandleRemoveMember(member, user_id) {
        //Check if member being removed is not admin.
        if (member.user_role !== 3) {
            const result = await RemoveMemberFromProject(project_id, user_id)
            if (result)
                RefetchProjectData();

            return true;
        } else {
            let bAnotherAdmisExists = false;

            //Check all the other user for admin role
            projectMembers.forEach((member, key) => {
                //if not the same users as the one being removed.
                if (key !== user_id) {
                    if (member.user_role === 3) {
                        bAnotherAdmisExists = true;
                    }
                }
            });
            if (bAnotherAdmisExists) {
                const result = await RemoveMemberFromProject(project_id, user_id)
                if (result) {
                    RefetchProjectData();
                    return true;

                }
            } else
                window.alert("Please add another admin before leaving the project!")
        }
    }
    async function HandleButtonNuke() {
        if (userRole === 3) {
            const response = await NukeProject(project_id);
            if (!response) {
                console.error("Error deleting project");
            } else
                navigate("/user/projects/");
        }
    }
    async function HandleButtonLeave() {
        let member;
        if (currentUser) {
            member = projectMembers.get(currentUser.id);
        }
        if (member) {
            const bRemoved = await HandleRemoveMember(member, currentUser.id);
            if (bRemoved)
                navigate("/user/projects/");
        }
    }

    return <>
        <div className="details-sidebar">
            <div className="button-close"><span>Project details</span><img src="/client/Images/icon_cross.svg" onClick={() => CloseSideBar('details-sidebar')} /></div>
            <div className="details">
                {<DropDownMenu html_items={memberListItems} button={<><h2>Members</h2>
                    {userRole >= 2 && <button><img onClick={() => SetShowAddMember(!bShowAddMember)} src="/client/Images/icon_plus.svg" alt="+" /></button>}</>}></DropDownMenu>
                }
            </div>
            <div className="section_leaveButtons">
                <button className="button-leave" onClick={HandleButtonLeave}><img src="/client\Images\icon_exit.svg" /><h2>Leave project</h2></button>
                <button className="button-nuke" onClick={HandleButtonNuke}><img src="/client\Images\icon_nuke.svg" /></button>
            </div>
        </div>
        {
            bShowAddMember &&
            <div className="display_addMember">
                <div className="button-close"><img src="/client/Images/icon_cross.svg" onClick={() => SetShowAddMember(false)} /></div>
                <div className="row"><input className="inpt_addMember" placeholder="Enter user's email"></input><button className="btn_search" onClick={HandleSearchMember}><img src="/client/Images/icon_search.svg" alt="" /></button></div>
                {txt_msgDisplay && < label className="msg_display">{txt_msgDisplay}</label>}
                {searchedUser &&
                    <div className="row">
                        <div className="searchedMember"><img src={"/client/Images/temp_preview_memberPP.webp"} />
                            <span>{searchedUser.username}</span>
                            <button className="btn_kickUser" onClick={HandleAddMember}><img src="/client/Images/icon_plus.svg" alt="Add" /></button>
                        </div>
                    </div>
                }
            </div>
        }
    </>
}