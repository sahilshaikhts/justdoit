import React from "react";

export default function ProjectCard({ title, organizationName, memberIcons,borderColor ,onClickCard}) {
    return <div className="project-card" onClick={onClickCard}>
        <div className="title" >{title}</div>
    </div>
}