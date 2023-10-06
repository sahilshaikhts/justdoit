import React, { useEffect, useState } from "react";
import DropDownMenu from "../Utility/Dropdown";
import Dropdown_2 from "../Utility/dd";
import UnfocusHandler from "../Utility/UnFocusElementHandler";
import { UpdateTask } from "../../scripts/API/access-projectsTasks";

export function TaskDisplay({ taskID, project_id, title, description, priority, progress, oMemberList, assignedMemberListIndex, userRole, bCreating = false, handleCloseDisplay }) {
    const [bEditingTitle, SetEditTitle] = useState(bCreating);
    const [bEditingDescription, SetEditDescription] = useState(bCreating);

    const [taskObject, setTaskObject] = useState({ title: "", description: "", priority: 0, progress: 0, assignedMemberListIndex: null })

    const [userListItems, setUserListItems] = useState();

    const progress_strList = ['Pending', 'In-progress', 'Review', 'Completed'];

    useEffect(() => {
        //Setup state object with passed in values or set to default if undefined or null
        setTaskObject({ title: title || "", description: description || "", priority: priority || 0, progress: progress || 0, assignedMemberListIndex: 0 });

        //Setup list of elemets for member list with profile pictures.
        if (oMemberList) {

            const mappedUser = oMemberList.map((member, index) => {
                //Find assigned user and set the state
                if (member.user_id === assignedMemberListIndex) {
                    OnUserChange(index);
                }
                return <div className="listItem_members" key={member.user_id}><span>{member.username}</span><img src={"/FrontEnd/Images/temp_preview_memberPP.webp"} /></div>
            });
            //Set the list and add a None option
            setUserListItems([<div className="listItem_members" key={-1}><span>None</span></div>
            ,...mappedUser]);
        }
    }, [])

    //Handle dropdownmenu selection change
    function OnProgressChange(listIndex) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            progress: listIndex
        }));
    }
    function OnPriorityChange(listIndex, updateButton) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            priority: listIndex
        }));
    }
    function OnUserChange(listIndex) {
        setTaskObject(prevTaskObject => ({
            ...prevTaskObject,
            assignedMemberListIndex: (listIndex-1)
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
        let assignedMemberID=null;
        if(taskObject.assignedMemberListIndex!==0)
        assignedMemberID=oMemberList[taskObject.assignedMemberListIndex].user_id;
    
        //Check for title(mandatory)
        if (taskObject.title) {
            const response = await UpdateTask(taskID, project_id, taskObject.title, taskObject.description, taskObject.priority, taskObject.progress,assignedMemberID );
            if(response)
            {
                handleCloseDisplay();
            }else
            {
                const msg_disp = document.getElementsByClassName("msg_display_form")[0];
            }
        }
    }



    return <div className="display-task">
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
            <DropDownMenu items={progress_strList} button={<label>{progress_strList[taskObject.progress]}</label>} OnChange={OnProgressChange}></DropDownMenu>
        </div>

        <div className="taskDisplay-section">
            <div className="taskDisplay-userInfo">
                <h2>Assigned to</h2>
                {true ?
                    (userListItems && <DropDownMenu html_items={userListItems} button={<label>{userListItems[taskObject.assignedMemberListIndex]}</label>} OnChange={OnUserChange}></DropDownMenu>)
                    : (userAssgined && <div className="assignedUser"><span>{userAssgined.username}</span><img src={userAssgined.photoURL} /></div>)
                }</div>
            <div className="taskDisplayButton-section"><button onClick={SaveTask} className="btn_save">Save</button>{userRole > 1 && <button className="btn_delete"><img src="/Frontend/Images/icon_delete.svg" /></button>}</div>
        </div>
        <label className="msg_display_form"></label>
    </div>
}
