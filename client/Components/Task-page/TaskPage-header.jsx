import React, { useContext, useEffect } from "react";
import ProjectDetailsSideBar from "./ProjectDetails-sidebar";

export default function TaskPageHeader({ project_id=undefined, project_title, userRole }) {

    return <div className="taskPage-header">
        <h1>{project_title}</h1>
        <button className="button_projectDetails" onClick={() => { document.getElementsByClassName('details-sidebar')[0].classList.toggle("active") }}><img src="/client/Images/icon_options.svg" /></button>
        <ProjectDetailsSideBar userRole={userRole} project_id={project_id}></ProjectDetailsSideBar>
    </div>
}