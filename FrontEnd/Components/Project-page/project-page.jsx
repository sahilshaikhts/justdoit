import React, { useEffect, useState } from "react";
import Filter_project from "./Filter-project";
import ProjectCard from "./project-card";
import { FetchUsersProject, CreateNewProject } from "../../scripts/API/user-projects";
import { useNavigate } from "react-router-dom";


export default function ProjectPage() {
    const [projectList, SetProjectList] = useState([]);
    const navigate = useNavigate();
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

    function OnClickProject(aProjectID) {
        navigate("/user/project/" + aProjectID + "/task")
    }

    async function AddNewTask() {
        const button = document.getElementById("button_addNewProject");
        const nameInput = document.getElementById("textfield_projectName");

        const newProject = await CreateNewProject(textfield_projectName.value);

        if (newProject) {
            console.log("ke ", newProject.id)
            SetProjectList((currentprojects) => {
                return [...currentprojects, { id: newProject.id, name: newProject.name, user_role: newProject.user_role }]
            })
        }
        button.style.visibility = "visible";
        nameInput.value = "";
        nameInput.style.visibility = "hidden";
    }

    function OnClickAddTask() {
        const button = document.getElementsByClassName("button_addNewProject")[0];

        const nameInput = document.getElementsByClassName("textfield_projectName")[0];

        nameInput.style.visibility = "visible";
    }

    function OnTaskNameEntered() {
        AddNewTask();
    }

    return (<>
        <Filter_project></Filter_project>
        <div className="project_page">
            <div className="container_projects">
                {projectList.map((project) => <ProjectCard onClickCard={() => OnClickProject(project.id)} key={project.id} title={project.name + project.id}></ProjectCard>)}

                <div className="button_addNewProject" onClick={OnClickAddTask}>
                    <input className="textfield_projectName" type="text" onKeyDown={(event) => { if (event.key === "Enter") OnTaskNameEntered(); }} placeholder="Project's name.." style={{ visibility: "hidden" }} />
                </div>
            </div>
        </div>
    </>
    );
}