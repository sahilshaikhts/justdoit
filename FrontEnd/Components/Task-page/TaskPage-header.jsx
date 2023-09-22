import React from "react";
import ProjectDetailsSideBar from "./ProjectDetails-sidebar";

export default function TaskPageHeader({project_title,project_members,user_role}) {
    project_title="Journey"
    return <div className="taskPage-header">
        <h1>{project_title}</h1>
        <div className="imgIcon_memebers"><img/></div>
        <button className="button_projectDetails"  onClick={() => { document.getElementsByClassName('details-sidebar')[0].classList.toggle("active") }}><img src="../FrontEnd/Images/icon_options.svg"/></button>
        <ProjectDetailsSideBar></ProjectDetailsSideBar>
    </div>
}