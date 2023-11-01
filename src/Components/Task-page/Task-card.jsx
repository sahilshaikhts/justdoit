import React, { useContext, useEffect, useState } from "react";
import MemberContext from "../../Context/ProjectMemberContext";

export default function TaskCard({ task_title, task_progress, task_priority, username, user_id, onClick }) {
    const priorityClassList = ["low", "normal", "high"];
    const {projectMembers} = useContext(MemberContext);

    return <>
        {projectMembers &&
            <div className="task-card" onClick={onClick}>
                <div className="task-title"><h2>{task_title}</h2></div>
                <div className="task-user-info"><h3>{username}</h3>
                    {projectMembers.has(user_id) && <div className="img_asignee"><img src={user_id !== null && projectMembers && projectMembers.size > 0 ? projectMembers.get(user_id).image_url : null} alt="" /></div>
                    }</div>
                <div className={"priority_indicator " + priorityClassList[task_priority]}><span className="tool-tip">Priority {priorityClassList[task_priority]}</span></div>
            </div>}
    </>
}