import React, { useEffect, useState } from "react"
import TaskPageHeader from "./TaskPage-header"
import TaskCard from "./Task-card"
import { useParams } from "react-router-dom"
import { FetchProjectTasks, AddNewTask, FetchProjectMembers } from "../../scripts/API/access-projectsTasks";
import { TaskDisplay } from "./NewTask-from";

export default function TaskPage({ aUserRole }) {
    const { projectId } = useParams();
    const [task_list, setTaskList] = useState([]);
    const [projectMembers,SetProjectMembers]=useState(null);
    
    const [bTaskDisplayOn, SetIsTaskDisplayOn] = useState(false);
    const [oTaskToDisplay, SetTaskToDisplay] = useState(null);
    
    const progress = { pending: 0, inProgress: 1, inReview: 2, completed: 3 }
   
    useEffect(() => {
        async function FetchTasks() {
            const tasks = await FetchProjectTasks(projectId);
            setTaskList(tasks)
        }
        async function GetProjectUsers()
        {
            const members=await FetchProjectMembers(projectId);
            SetProjectMembers(members);
        }
        FetchTasks();   
        GetProjectUsers();
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
        {bTaskDisplayOn && oTaskToDisplay &&<TaskDisplay projectID ={projectId}taskID={oTaskToDisplay.id} handleCloseDisplay={OnCloseDisplay} oMemberList={projectMembers} assignedMemberListIndex={0} title={oTaskToDisplay.title} description={oTaskToDisplay.description} priority={oTaskToDisplay.priority}
            userRole={0} bCreating={false} progress={oTaskToDisplay.progress}/>}
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