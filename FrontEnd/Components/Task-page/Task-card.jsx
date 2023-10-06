import React from "react";

export default function TaskCard({ task_title,task_progress, task_priority, username,picture ,onClick}) {
    const priorityClassList=["low","normal","high"];
    
    return <div className="task-card" onClick={onClick}>
        <div className="task-title"><h2>{task_title}</h2></div>
        <div className="task-user-info"><h3>{username}</h3>
            <div className="img_asignee"><img src="/FrontEnd\Images\temp_preview_memberPP.webp" alt="" /></div>
        </div>
        <div className={"priority_indicator "+priorityClassList[task_priority]}><span className="tool-tip">Priority {priorityClassList[task_priority]}</span></div>
    </div>
}