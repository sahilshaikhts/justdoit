import React from "react";

export default function ProjectCard({ title, organizationName, memberIcons,onClickCard}) {
    return <div className="project-card" onClick={onClickCard}>
        <div className="title" >{title}</div>
    </div>
}