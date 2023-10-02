import React, { useEffect, useState } from "react";
import DropDownMenu from "../Utility/Dropdown";
import Dropdown_2 from "../Utility/dd";
import UnfocusHandler from "../Utility/UnFocusElementHandler";

export function TaskDisplay({ title, description, priority, progress, oMemberList, assignedUsersListID, userRole, bCreating = false, handleCloseDisplay }) {
    const [bEditingTitle, SetEditTitle] = useState(bCreating);
    const [bEditingDescription, SetEditDescription] = useState(bCreating);
    const [taskObject, setTaskObject] = useState({ title: "", description: "", priority: 0, progress: 0 })
    const progress_strList = ['Pending', 'In-progress', 'Review', 'Completed'];
    const [userList, setUserList] = useState();
    const [userAssgined, setAssignedUser] = useState();

    function SaveTask() {
        let updatedTask = taskObject;
        updatedTask.progress = progress_strList[progressIndex];
        setTaskObject(updatedTask);
    }

    useEffect(() => {
        //Setup state object with passed in values or set to default if undefined or null
        setTaskObject({ title: title || "", description: description || "", priority: priority || 0, progress: progress || 0 });

        //Setup list of elemets for member list with profile pictures.
        if (oMemberList) {

            const mappedUser = oMemberList.map((member) => {
                //Find assigned user and set the state
                if (member.id === assignedUsersListID) {
                    setAssignedUser(member);
                }
                return <div key={member.id}><span>{member.username}</span><img src={member.photoURL} /></div>
            });
            setUserList(mappedUser);
        }
    }, [])

    return <div className="display-task">
        <div className="taskDisplay-section">
            {bEditingTitle ? (<input className="field_title" type="text" maxLength={32} placeholder={taskObject.title}></input>) :
                (<h1>{taskObject.title}</h1>)}
            <img className="btn_edit" onClick={() => SetEditTitle(!bEditingTitle)} src="/Frontend/Images/icon_pen.svg" />
            <button className="btn_close" onClick={handleCloseDisplay} ><img src="/FrontEnd/Images/icon_cross.svg" /></button>
        </div>

        <div className="taskDisplay-section">
            {bEditingDescription ? (<input className="field_description" type="text" maxLength={128} placeholder={taskObject.description}></input>) :
                (<p>{taskObject.description}</p>)}<img className="btn_edit" onClick={() => SetEditDescription(!bEditingDescription)} src="/Frontend/Images/icon_pen.svg" />
        </div>

        <div className="taskDisplay-section">
            <DropDownMenu items={progress_strList} button={<label>{progress_strList[progress]}</label>} >                </DropDownMenu>
        </div>

        <div className="taskDisplay-section">
            <div className="taskDisplay-userInfo">
                <h2>Assigned to</h2>
                {true ?
                    <DropDownMenu items={progress_strList} button={<label>{progress_strList[progress]}</label>} ></DropDownMenu>
                    : (userAssgined && <div className="assignedUser"><span>{userAssgined.username}</span><img src={userAssgined.photoURL} /></div>)
                }</div>
            <div className="taskDisplayButton-section"><button className="btn_save">Save</button>{userRole > 1 && <button className="btn_delete"><img src="/Frontend/Images/icon_delete.svg" /></button>}</div>
        </div>
    </div>
}
