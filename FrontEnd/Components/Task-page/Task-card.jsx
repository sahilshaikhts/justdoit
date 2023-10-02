import React from "react";

export default function TaskCard({ task_title, task_description, task_progress, task_priority, user_role ,onClick}) {
    return <div className="task-card orange" onClick={onClick}>
        <div className="task-title"><h2>{task_title}</h2></div>
        <div className="task-user-info"><h3>Sahil</h3>
            <div className="img_asignee"><img src="/FrontEnd\Images\temp_preview_memberPP.webp" alt="" /></div>
        </div>
        <div className="priority_indicator"><span className="tool-tip">Priority ---</span></div>
    </div>
}