import React, { useContext, useEffect } from "react";
import ProjectDetailsSideBar from "./ProjectDetails-sidebar";
import MemberContext from "../../Context/ProjectMemberContext";

export default function TaskPageHeader({ project_id, project_title, user_role }) {
    const projectMembers = useContext(MemberContext);

    return <div className="taskPage-header">
        <h1>{project_title}</h1>
        <button className="button_projectDetails" onClick={() => { document.getElementsByClassName('details-sidebar')[0].classList.toggle("active") }}><img src="/FrontEnd/Images/icon_options.svg" /></button>
        <ProjectDetailsSideBar project_id={project_id}></ProjectDetailsSideBar>
    </div>
}