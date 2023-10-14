import React, { useContext, useEffect, useState } from "react";
import DropDownMenu from "../Utility/Dropdown";
import { ChangeUserProjectRole, FetchUserWithEmail } from "../../scripts/API/user-data-api";
import { AddMemberToProject } from "../../scripts/API/user-projects";
import MemberContext from "../../Context/ProjectMemberContext";

export default function ProjectDetailsSideBar({ project_id, userRole = 2 }) {
    const projectMembers = useContext(MemberContext);

    const [memberListItems, SetMemberListItems] = useState(null);
    const [bShowAddMember, SetShowAddMember] = useState(false)
    const [searchedUser, setSearchedUser] = useState(false)

    const userRole_strList=["Viewer","Member","Moderator","Admin"]

    useEffect(() => {
            let mappedUser=[]
             projectMembers.forEach((member, key) => { 
                mappedUser.push( <div className="list_members" key={key}><img src={ projectMembers.get(key).image_url } /><span>{member.username}</span>
                    {userRole >= 2 && 
                    <div className="menu_role">
                        <DropDownMenu startIndex={member.user_role}items={userRole_strList} OnChange={(index)=>ChangeUserRole(index,key)} button={<img src="/Frontend/Images/icon_role.svg" alt="kick" />}></DropDownMenu>
                    </div>
                    }
                    {userRole >= 2 && <button className="btn_kickUser"><img src="/Frontend/Images/icon_kickUser.svg" alt="kick" /></button>}
                </div>);
            });
            console.log(mappedUser)
            SetMemberListItems(mappedUser);
    }, [projectMembers]);

    function ChangeUserRole(index, user_id) {
        
        if (user_id!==null && project_id!==null) {
            if (index >= 0 && index < 4) {
                const response = ChangeUserProjectRole(project_id, user_id, index);
                if(response==false)
                {
                    console.error("Error changing user's role");
                }
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
        const msg_disp = document.getElementsByClassName("msg_display")[0];
        if (element) {
            if (element.value) {
                //Verify email format(RFC2822)
                let verify = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (verify.test(element.value)) {
                    const user = await FetchUserWithEmail(element.value);
                    if (user) {
                        msg_disp.innerText = "User found"
                        setSearchedUser(user);
                    } else {
                        msg_disp.innerText = "No user with " + element.value + " exists!";
                    }
                }
            }
        }
    }
    async function HandleAddMember() {
        const email = searchedUser.email;
        const role_level = 0;

        console.log(email, project_id)

        if (email && project_id) {
            console.log("test")

            const response = await AddMemberToProject(project_id, email, role_level);
            const msg_disp = document.getElementsByClassName("msg_display")[0];

            console.log("test2")

            if (response) {
                msg_disp.innerText = searchedUser.username + " was added succesfully!"
            }
            else {
                msg_disp.innerText = "Something went wrong!Error adding user."
            }
        }
    }
    return <>
        <div className="details-sidebar">
            <div className="button-closeSideBar"><span>Project details</span><img src="/FrontEnd/Images/icon_cross.svg" onClick={() => CloseSideBar('details-sidebar')} /></div>
            <div className="details">
                {<DropDownMenu html_items={memberListItems} button={<><h2>Members</h2>
                    {userRole >= 2 && <button><img onClick={() => SetShowAddMember(!bShowAddMember)} src="/Frontend/Images/icon_plus.svg" alt="+" /></button>}</>}></DropDownMenu>
                }
            </div>
            <div className="button-leave"><button><img src="/FrontEnd\Images\icon_exit.svg" /><h2>Leave project</h2></button></div>

        </div>
        {
            bShowAddMember &&
            <div className="display_addMember">
                <div className="row"><input className="inpt_addMember" placeholder="Enter user's email"></input><button className="btn_search" onClick={HandleSearchMember}><img src="/Frontend/Images/icon_search.svg" alt="" /></button></div>
                <label className="msg_display"></label>
                {searchedUser &&
                    <div className="row">
                        <div className="searchedMember"><img src={"/FrontEnd/Images/temp_preview_memberPP.webp"} />
                            <span>{searchedUser.username}</span>
                            <button className="btn_kickUser" onClick={HandleAddMember}><img src="/Frontend/Images/icon_plus.svg" alt="Add" /></button>
                        </div>
                    </div>
                }
            </div>
        }
    </>
}