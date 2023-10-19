import React, { useEffect, useState } from "react";
import Filter_project from "./Filter-project";
import ProjectCard from "./project-card";
import { FetchUsersProject, CreateNewProject } from "../../scripts/API/user-projects";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthorizationContext";


export default function ProjectPage() {
    const [projectList, SetProjectList] = useState([]);
    const [bAddProject, SetAddProject] = useState(false);
    const {currentUser}=useAuthContext();
    const navigate = useNavigate();
    //Load user's projects
    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        const projects = await FetchUsersProject();
        if (projects) {
            SetProjectList(projects);
        }
    }

    function OnClickProject(aProjectID) {
        if(currentUser && currentUser.id!==undefined)
        navigate("/user/"+currentUser.id+"/project/" + aProjectID + "/task")
    }

    async function AddNewTask() {
        const nameInput = document.getElementsByClassName("textfield_projectName")[0];
        const newProject = await CreateNewProject(nameInput.value);

        if (newProject) {
            //Refetch projects and update page.
            await fetchProjects();
        }
        nameInput.value = "";
    }

    function OnClickAddTask() {
        const nameInput = document.getElementsByClassName("textfield_projectName")[0];
        if (nameInput)
            nameInput.value = "";

        SetAddProject((value) => !value);
    }

    function OnTaskNameEntered() {
        AddNewTask();
    }

    return (<>
        <div className="title-projectPage"><label>Projects |</label></div>
        <div className="project_page">
            <div className="container_projects">
                {projectList.map((project) => <ProjectCard onClickCard={() => OnClickProject(project.id)} key={project.id} title={project.name}></ProjectCard>)}

                <div className="button_addNewProject" >
                    {bAddProject && <input className="textfield_projectName" type="text" onKeyDown={(event) => { if (event.key === "Enter") OnTaskNameEntered(); }} placeholder="Project's name.." />
                    }
                    <img onClick={OnClickAddTask} src="/Frontend/Images/icon_plus.svg" alt="" /> </div>
            </div>
        </div>
    </>
    );
}