import React, { useEffect, useState } from "react";
import Filter_project from "./Filter-project";
import ProjectCard from "./project-card";
import { FetchUsersProject, CreateNewProject } from "../../scripts/API/user-projects";


export default function ProjectPage() {
    const [projectList, SetProjectList] = useState([]);

    //Load user's projects
    useEffect(() => {
        let pageActive = true;

        const fetchProjects = async () => {
            const projects = await FetchUsersProject();
            if (projects && pageActive) {
                SetProjectList(projects);
            }
        }
        fetchProjects();
        return () => pageActive = false;
    }, []);

    async function AddNewTask() {
        const button = document.getElementById("button_addNewProject");
        const nameInput = document.getElementById("textfield_projectName");

        const newProject = await CreateNewProject(textfield_projectName.value);

        if (newProject) {
            console.log("ke " ,newProject.id)
            SetProjectList((currentprojects) => {
                return [...currentprojects, { id:newProject.id,name: newProject.name, user_role: newProject.user_role }]
            })
        }
        button.style.visibility = "visible";
        nameInput.value="";
        nameInput.style.visibility = "hidden";
    }

    function OnClickAddTask() {
        const button = document.getElementById("button_addNewProject");

        const nameInput = document.getElementById("textfield_projectName");

        button.style.visibility = "hidden";
        nameInput.style.visibility = "visible";
    }

    function OnTaskNameEntered() {
        AddNewTask();
    }

    return (
        <div className="project_page">
            <Filter_project></Filter_project>
            <div className="container_projects">
                {
                    projectList.map((project) => <ProjectCard key={project.id} title={project.name}></ProjectCard>)
                }
                <div id="button_addNewProject" onClick={OnClickAddTask}>
                    <input id="textfield_projectName" type="text" onKeyDown={(event) => { if (event.key === "Enter") OnTaskNameEntered(); }} placeholder="Project's name.." style={{ visibility: "hidden" }} />
                </div>

            </div>
        </div>
    );
}