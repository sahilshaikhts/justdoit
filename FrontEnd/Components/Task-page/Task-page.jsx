import React, { useEffect, useState } from "react"
import TaskPageHeader from "./TaskPage-header"
import TaskCard from "./Task-card"
import { useParams } from "react-router-dom"
import { FetchProjectTasks, AddNewTask } from "../../scripts/API/access-projectsTasks";
import { TaskDisplay } from "./NewTask-from";

export default function TaskPage({ aUserRole }) {
    const { projectId } = useParams();
    const [task_list, setTaskList] = useState([]);
    const [bTaskDisplayOn, SetIsTaskDisplayOn] = useState(false);
    const [oTaskToDisplay, SetTaskToDisplay] = useState(null);
    const progress = { pending: 0, inProgress: 1, inReview: 2, completed: 3 }
    const temp_userList=[{id:0,username:"Sahil",photoURL:"/FrontEnd/Images/temp_preview_memberPP.webp"},{id:1,username:"Smit",photoURL:"/FrontEnd/Images/temp_preview_memberPP.webp"},{id:3,username:"Bhund",photoURL:"/FrontEnd/Images/temp_preview_memberPP.webp"}]
   
    useEffect(() => {
        async function FetchTasks() {
            const tasks = await FetchProjectTasks(projectId);
            setTaskList(tasks)
        }
        FetchTasks();
    }, []);

    function OnClickTaskCard(aTaskId) {
        SetTaskToDisplay(task_list.filter((task) => task.id === aTaskId)[0]);
        SetIsTaskDisplayOn(true);
    }
    
    function OnCloseDisplay() {
        SetTaskToDisplay(null);
        SetIsTaskDisplayOn(false);
    }

    async function CreateNewTasks() {
        await AddNewTask(projectId, "Code procedural generation", "test", 1);
    }

    return <>
        {bTaskDisplayOn && oTaskToDisplay &&<TaskDisplay handleCloseDisplay={OnCloseDisplay} oMemberList={temp_userList} assignedUsersListID={0} title={oTaskToDisplay.title} description={oTaskToDisplay.description} priority={oTaskToDisplay.priority}
            assignedUserName={oTaskToDisplay.user_id} assignedUserPicturePath={oTaskToDisplay.title} userRole={oTaskToDisplay.title} bCreating={false} progress={oTaskToDisplay.progress}/>}
        <div className="task-page">
            <TaskPageHeader></TaskPageHeader>
            <div className="task-sections-container">
                <div className="task-container"><div className="container-title"><h2>Pending</h2></div>
                    {task_list.map((task) => {
                        if (task.progress == progress.pending)
                            return <TaskCard key={task.id} task_title={task.title} task_description={task.description} user_role={aUserRole} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}
                </div>
                <div className="task-container"><div className="container-title"><h2>InProgress</h2></div>
                    {task_list.map((task) => {
                        if (task.progress == progress.inProgress)
                            return <TaskCard key={task.id} task_title={task.title} task_description={task.description} user_role={aUserRole} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}
                </div>
                <div className="task-container"><div className="container-title"><h2>InReview</h2></div>
                    {task_list.map((task) => {
                        if (task.progress == progress.inReview)
                            return <TaskCard key={task.id} task_title={task.title} task_description={task.description} user_role={aUserRole} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}
                </div>
                <div className="task-container"><div className="container-title"><h2>Completed</h2></div>
                    {task_list.map((task) => {
                        if (task.progress == progress.completed)
                            return <TaskCard key={task.id} task_title={task.title} task_description={task.description} user_role={aUserRole} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}</div>
            </div>
            <button className="button_newTask" onClick={CreateNewTasks}>Add</button>
        </div>
    </>
}