import React, { createContext, useEffect, useState } from "react"
import TaskPageHeader from "./TaskPage-header"
import TaskCard from "./Task-card"
import { useParams } from "react-router-dom"
import { FetchProjectTasks, AddNewTask, FetchProjectMembers } from "../../scripts/API/access-projectsTasks";
import { TaskDisplay } from "./NewTask-from";
import DOMPurify from "dompurify";
import MemberContext from "../../Context/ProjectMemberContext";
import { GetProjectMembersData, GetMembersWProfileImage } from "../../scripts/API/SetupProjectData";

export default function TaskPage({ aUserRole }) {
    const urlParam = useParams();
    const project_id = DOMPurify.sanitize(urlParam.projectId);

    const [task_list, setTaskList] = useState([]);
    const [projectMembers, SetProjectMembers] = useState(new Map());

    const [bTaskDisplayOn, SetIsTaskDisplayOn] = useState(false);
    const [oTaskToDisplay, SetTaskToDisplay] = useState(null);

    const progress = { pending: 0, inProgress: 1, inReview: 2, completed: 3 }

    useEffect(() => {
        async function test()
        {
            await InitializePage();
        }
        test();
    }, []);

    async function  InitializePage() {
       await FetchTasks();
       await SetMembersData();
    }

    async function FetchTasks() {
        const tasks = await FetchProjectTasks(project_id);
        setTaskList(tasks)
    }
 
    async function SetMembersData() {
        const members = await GetProjectMembersData(project_id);
        
        //Set the basic member data with default user image.
        if (members) {
            alert(JSON.stringify(members))
            SetProjectMembers(members);
            //Try Fetch image for each user and update the array.
            const updatedMembers = await GetMembersWProfileImage(members);
            alert(JSON.stringify(updatedMembers))

            if (updatedMembers){
                SetProjectMembers(updatedMembers);
            }
        }
    }
    function OnClickTaskCard(aTaskId) {
        //Find the task that was clicked on
        const task = task_list.find((task) => task.id === aTaskId);
        let memberID;
        if (projectMembers && projectMembers.size > 0) {
            if (task.user_id !== undefined) {
                memberID = task.user_id;
            } else
                memberID = -1;

            SetTaskToDisplay({ ...task, assignedMemberID: memberID });
            SetIsTaskDisplayOn(true);
        } else
            console.error("Missing projectMembers!!");
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

    return <MemberContext.Provider value={projectMembers}>
            {bTaskDisplayOn && oTaskToDisplay && <TaskDisplay project_id={project_id} taskID={oTaskToDisplay.id} handleCloseDisplay={OnCloseDisplay} assignedMemberID={oTaskToDisplay.assignedMemberID} title={oTaskToDisplay.title} description={oTaskToDisplay.description} priority={oTaskToDisplay.priority}
                userRole={0} bCreating={!oTaskToDisplay.id} progress={oTaskToDisplay.progress} />}
            <div className="task-page">
                <TaskPageHeader project_id={project_id} project_title={"project_title"}></TaskPageHeader>
                <div className="task-sections-container">
                    <div className="task-container"><div className="container-title"><h2>Pending</h2></div>
                        {task_list && task_list.map((task) => {
                            if (task.progress == progress.pending)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                    <div className="task-container"><div className="container-title"><h2>InProgress</h2></div>
                        {task_list && task_list.map((task) => {
                            if (task.progress == progress.inProgress)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                    <div className="task-container"><div className="container-title"><h2>InReview</h2></div>
                        {task_list && task_list.map((task) => {
                            if (task.progress == progress.pending)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                    <div className="task-container"><div className="container-title"><h2>Completed</h2></div>
                        {task_list && task_list.map((task) => {
                            if (task.progress == progress.pending)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                </div>
                <button className="button_newTask" onClick={CreateNewTasks}><img src="/Frontend/Images/icon_addTask.svg" alt="" /></button>
            </div>
    </MemberContext.Provider>

}