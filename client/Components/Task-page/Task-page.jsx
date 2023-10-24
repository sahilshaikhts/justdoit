import React, { createContext, useEffect, useState } from "react"
import TaskPageHeader from "./TaskPage-header"
import TaskCard from "./Task-card"
import { useParams } from "react-router-dom"
import { FetchProjectTasks, AddNewTask, FetchProjectMembers } from "../../scripts/API/access-projectsTasks";
import { TaskDisplay } from "./NewTask-from";
import DOMPurify from "dompurify";
import MemberContext from "../../Context/ProjectMemberContext";
import { GetProjectMembersData } from "../../scripts/API/SetupProjectData";
import { FetchUsersProject } from "../../scripts/API/user-projects";

export default function TaskPage() {
    const [currentUser, SetCurrentUser] = useState();//{id,user_role}
    const urlParam = useParams();
    const project_id = parseInt(DOMPurify.sanitize(urlParam.projectId));
    const currentUser_id = parseInt(DOMPurify.sanitize(urlParam.currentUserId));

    const [task_list, setTaskList] = useState([]);
    const [project_name, setProjectName] = useState('');
    const [projectMembers, SetProjectMembers] = useState(new Map());

    const [bTaskDisplayOn, SetIsTaskDisplayOn] = useState(false);
    const [oTaskToDisplay, SetTaskToDisplay] = useState(null);

    const progress = { pending: 0, inProgress: 1, inReview: 2, completed: 3 }

    useEffect(() => {
        InitializePage();
    }, []);

    async function InitializePage() {
        FetchProjectName();
        FetchTasks();
        SetMembersData();
    }
    async function FetchProjectName() {
        const project= await FetchUsersProject(project_id);
        if(project)
        {
            setProjectName(project.name);
        }
    }

    async function FetchTasks() {
        const tasks = await FetchProjectTasks(project_id);
        setTaskList(tasks)
    }

    async function SetMembersData() {
        const members = await GetProjectMembersData(project_id);
        
        //Set the basic member data with default user image.
        if (members) {
            SetProjectMembers(members);
            SetupCurrentUser(members);
        }else
        console.error("Error fetching projects members")
    }

    function SetupCurrentUser(members) {
        if (currentUser_id !== null && currentUser_id !== undefined) {
            const user = members.get(currentUser_id);
            if (user) {
                SetCurrentUser({ id: currentUser_id, role: user.user_role })
                return;
            }
        }

        //Todo: handle redirecting and displaying error message on a generic error page.
        //Log error when currentUser couldn't be set and redirect.
        console.error("Missing currentUser data,page can't be loaded!")
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

    async function OnCloseDisplay() {
        SetTaskToDisplay(null);
        SetIsTaskDisplayOn(false);
        await InitializePage();
    }

    async function CreateNewTasks() {
        //Set task to display null to mark it as creating state (bCreating={!oTaskToDisplay.id}).
        SetTaskToDisplay({})
        SetIsTaskDisplayOn(true);
    }

    return <MemberContext.Provider value={{ projectMembers, RefetchProjectData: InitializePage }}>
        {currentUser && bTaskDisplayOn && oTaskToDisplay && <TaskDisplay project_id={project_id} taskID={oTaskToDisplay.id} handleCloseDisplay={OnCloseDisplay} assignedMemberID={oTaskToDisplay.assignedMemberID} title={oTaskToDisplay.title} description={oTaskToDisplay.description} priority={oTaskToDisplay.priority}
            userRole={currentUser.role} bCreating={!oTaskToDisplay.id} progress={oTaskToDisplay.progress} />}
        <div className="task-page">
            {currentUser && <TaskPageHeader userRole={currentUser.role} project_id={project_id} project_title={project_name}></TaskPageHeader>}            <div className="task-sections-container">
                {projectMembers && task_list && <>
                    <div className="task-container"><div className="container-title"><h2>Pending</h2></div>
                        {task_list.map((task) => {
                            if (task.progress == progress.pending)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                    <div className="task-container"><div className="container-title"><h2>InProgress</h2></div>
                        {task_list.map((task) => {
                            if (task.progress == progress.inProgress)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                    <div className="task-container"><div className="container-title"><h2>InReview</h2></div>
                        {task_list.map((task) => {
                            if (task.progress == progress.inReview)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                    <div className="task-container"><div className="container-title"><h2>Completed</h2></div>
                        {task_list.map((task) => {
                            if (task.progress == progress.completed)
                                return <TaskCard key={task.id} task_title={task.title} task_priority={task.priority} username={task.username} user_id={task.user_id} onClick={() => OnClickTaskCard(task.id)}></TaskCard>
                        })}
                    </div>
                </>
                }
            </div>
            {bTaskDisplayOn === false && <button className="button_newTask" onClick={CreateNewTasks}><img src="/client/Images/icon_addTask.svg" alt="" /></button>}        </div>
    </MemberContext.Provider>

}