import React, { useEffect, useState } from "react"
import TaskPageHeader from "./TaskPage-header"
import TaskCard from "./Task-card"
import { useParams } from "react-router-dom"
import { FetchProjectTasks, AddNewTask, FetchProjectMembers } from "../../scripts/API/access-projectsTasks";
import { TaskDisplay } from "./NewTask-from";
import DOMPurify from "dompurify";

export default function TaskPage({ aUserRole }) {
    const urlParam = useParams();
    const project_id=DOMPurify.sanitize(urlParam.projectId);

    const [task_list, setTaskList] = useState([]);
    const [projectMembers,SetProjectMembers]=useState(null);
    
    const [bTaskDisplayOn, SetIsTaskDisplayOn] = useState(false);
    const [oTaskToDisplay, SetTaskToDisplay] = useState(null);
    
    const progress = { pending: 0, inProgress: 1, inReview: 2, completed: 3 }
   
    useEffect(() => {
        InitializePage();

        return()=>{
            setTaskList([]);
            SetProjectMembers([]);
            SetIsTaskDisplayOn(false)
            SetIsTaskDisplayOn(null)
        }
    }, []);

    function InitializePage()
    {
        async function FetchTasks() {
            const tasks = await FetchProjectTasks(project_id);
        console.log(tasks)

            setTaskList(tasks)
        }
        async function GetProjectUsers()
        {
            const members=await FetchProjectMembers(project_id);
            SetProjectMembers(members);
        }
        FetchTasks();   
        GetProjectUsers();
    }
    function OnClickTaskCard(aTaskId) {
        SetTaskToDisplay(task_list.filter((task) => task.id === aTaskId)[0]);
        SetIsTaskDisplayOn(true);
    }
    
    function OnCloseDisplay() {
        SetTaskToDisplay(null);
        SetIsTaskDisplayOn(false);
        InitializePage();
    }

    async function CreateNewTasks() {
        //Set task to display null to mark it as creating state (bCreating={!oTaskToDisplay.id}).
        SetTaskToDisplay({})
        SetIsTaskDisplayOn(true);
    }

    return <>
        {bTaskDisplayOn && oTaskToDisplay &&<TaskDisplay  project_id ={project_id} taskID={oTaskToDisplay.id} handleCloseDisplay={OnCloseDisplay} oMemberList={projectMembers} assignedMemberListIndex={0} title={oTaskToDisplay.title} description={oTaskToDisplay.description} priority={oTaskToDisplay.priority}
            userRole={0} bCreating={!oTaskToDisplay.id} progress={oTaskToDisplay.progress}/>}
        <div className="task-page">
            {projectMembers && <TaskPageHeader project_id ={project_id}project_title oMemberList={projectMembers}></TaskPageHeader>}
            <div className="task-sections-container">
                <div className="task-container"><div className="container-title"><h2>Pending</h2></div>
                    {task_list && task_list.map((task) => {
                        if (task.progress == progress.pending)
                            return <TaskCard key={task.id} task_title={task.title}task_priority={task.priority} username={task.username} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}
                </div>
                <div className="task-container"><div className="container-title"><h2>InProgress</h2></div>
                    {task_list && task_list.map((task) => {
                        if (task.progress == progress.inProgress)
                        return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}
                </div>
                <div className="task-container"><div className="container-title"><h2>InReview</h2></div>
                    {task_list && task_list.map((task) => {
                        if (task.progress == progress.inReview)
                        return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}
                </div>
                <div className="task-container"><div className="container-title"><h2>Completed</h2></div>
                    {task_list && task_list.map((task) => {
                        if (task.progress == progress.completed)
                        return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                    })}</div>
            </div>
            <button className="button_newTask" onClick={CreateNewTasks}>Add</button>
        </div>
    </>
}