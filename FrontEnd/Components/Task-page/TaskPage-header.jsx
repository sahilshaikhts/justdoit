import React, { useEffect } from "react";
import ProjectDetailsSideBar from "./ProjectDetails-sidebar";

export default function TaskPageHeader({project_id,project_title,oMemberList,user_role}) {

    return <div className="taskPage-header">
        <h1>{project_title}</h1>
        <div className="imgIcon_memebers"><img/></div>
        <button className="button_projectDetails"  onClick={() => { document.getElementsByClassName('details-sidebar')[0].classList.toggle("active") }}><img src="/FrontEnd/Images/icon_options.svg"/></button>
        <ProjectDetailsSideBar project_id ={project_id} oMemberList={oMemberList}></ProjectDetailsSideBar>
    </div>
}