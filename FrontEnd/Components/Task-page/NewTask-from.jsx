import React, { useContext, useEffect, useState } from "react";
import DropDownMenu from "../Utility/Dropdown";
import { AddNewTask, UpdateTask } from "../../scripts/API/access-projectsTasks";
import MemberContext from "../../Context/ProjectMemberContext";

export function TaskDisplay({ taskID, project_id, title, description, priority, progress, assignedMemberID = -1, userRole, bCreating = false, handleCloseDisplay }) {
    const  projectMembers  = useContext(MemberContext);

    const [bEditingTitle, SetEditTitle] = useState(bCreating);
    const [bEditingDescription, SetEditDescription] = useState(bCreating);

    const [taskObject, setTaskObject] = useState({ title: "", description: "", priority: 0, progress: 0, assignedMemberID: -1, assignedMemberListIndex: 0 })

    const [userListItems, setUserListItems] = useState();
    const [userItemsUserId, setUserItemsUserId] = useState();

    const progress_strList = ['Pending', 'In-progress', 'Review', 'Completed'];
    const priority_strList = ['Low', 'Normal', 'High'];

    useEffect(() => {
        //Setup state object with passed in values or set to default if undefined or null/-1
        setTaskObject({ title: title || "", description: description || "", priority: priority || 0, progress: progress || 0, assignedMemberID: assignedMemberID, assignedMemberListIndex: 0 });

        //Setup list of elemets for member list with profile pictures.
        if (projectMembers) {
            let mappedUser = [<div className="listItem_members" key={-1}><span>None</span></div>];
            let mappedUserId = [-1];//Map each element with its user'id into this array.
            let index = 1, selectIndex = 0;

            projectMembers.forEach((member, key) => {
                //Find assigned user and set the state
                if (key === assignedMemberID) {
                    selectIndex = index;
                }
                mappedUserId.push(key);
                mappedUser.push(<div className="listItem_members" key={key} ><span>{member.username}</span>{<img src={member.image_url} />}</div>)
                index++;
            });
            setTaskObject(prevTaskObject => ({
                ...prevTaskObject,
                assignedMemberID: mappedUserId[selectIndex],
                assignedMemberListIndex: selectIndex
            }));

            //Set the list and add a None option
            if (mappedUser) {
                setUserListItems(mappedUser);
                setUserItemsUserId(mappedUserId);
            }
        }

        return () => {
            SetEditTitle(false);
            SetEditDescription(false);
            setTaskObject({ title: "", description: "", priority: 0, progress: 0, assignedMemberID: 0 });
            setUserListItems(null);
        };
    }, [])

    //Handle dropdownmenu selection change
    function OnProgressChange(listIndex) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            progress: listIndex
        }));
    }
    function OnPriorityChange(listIndex) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            priority: listIndex
        }));
    }
    function OnUserChange(listIndex, event) {
        let selectedUserId = userItemsUserId[listIndex];

        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            assignedMemberID: selectedUserId,
            assignedMemberListIndex: listIndex
        }));
    }

    function OnTitleChange(event) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            title: event.target.value
        }));
    }
    function OnDescriptionChange(event) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            description: event.target.value
        }));
    }

    async function SaveTask() {
        //Check if member set if not pass null
        let assignedMemberID = null;
        if (taskObject.assignedMemberID !== -1)
            assignedMemberID = taskObject.assignedMemberID;

        //Check for title(mandatory)
        if (taskObject.title) {
            let response;

            if (bCreating === false)
                response = await UpdateTask(taskID, project_id, taskObject.title, taskObject.description, taskObject.priority, taskObject.progress, assignedMemberID);
            else
                response = await AddNewTask(project_id, taskObject.title, taskObject.description, taskObject.priority, taskObject.progress, assignedMemberID);

            console.log(response)

            if (response) {
                handleCloseDisplay();
            } else {
                const msg_disp = document.getElementsByClassName("msg_display_form")[0];
            }
        }
    }

    return <div className="display-task">
        {taskObject && <>
            <div className="taskDisplay-section">
                {bEditingTitle ? (<input onChange={OnTitleChange} className="field_title" type="text" maxLength={32} placeholder={taskObject.title}></input>) :
                    (<h1>{taskObject.title}</h1>)}
                <img className="btn_edit" onClick={() => SetEditTitle(!bEditingTitle)} src="/Frontend/Images/icon_pen.svg" />
                <button className="btn_close" onClick={handleCloseDisplay} ><img src="/FrontEnd/Images/icon_cross.svg" /></button>
            </div>

            <div className="taskDisplay-section">
                {bEditingDescription ? (<textarea onChange={OnDescriptionChange} className="field_description" maxLength={128} placeholder={taskObject.description}></textarea>) :
                    (<p>{taskObject.description}</p>)}<img className="btn_edit" onClick={() => SetEditDescription(!bEditingDescription)} src="/Frontend/Images/icon_pen.svg" />
            </div>

            <div className="taskDisplay-section">
                <div className="section-dropdown">
                    {taskObject && <DropDownMenu items={progress_strList} startIndex={taskObject.progress} button={<label>{progress_strList[taskObject.progress]}</label>} OnChange={OnProgressChange}></DropDownMenu>}
                    {taskObject && <DropDownMenu items={priority_strList} startIndex={taskObject.priority} button={<label>{priority_strList[taskObject.priority]}</label>} OnChange={OnPriorityChange}></DropDownMenu>}
                </div>
            </div>
            <div className="taskDisplay-section">
                <div className="taskDisplay-userInfo">
                    <h2>Assigned to</h2>
                    {true ?
                        (taskObject && userListItems && <DropDownMenu html_items={userListItems} startIndex={taskObject.assignedMemberListIndex} button={userListItems[taskObject.assignedMemberListIndex]} OnChange={OnUserChange}></DropDownMenu>)
                        : (userAssgined && <div className="assignedUser"><span>{userAssgined.username}</span><img src={userAssgined.photoURL} /></div>)
                    }</div>
                <div className="taskDisplayButton-section"><button onClick={SaveTask} className="btn_save">Save</button>{userRole > 1 && <button className="btn_delete"><img src="/Frontend/Images/icon_delete.svg" /></button>}</div>
            </div>
        </>
        }
        <label className="msg_display_form"></label>
    </div>
}
