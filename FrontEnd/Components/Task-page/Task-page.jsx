import React from "react"
import TaskPageHeader from "./TaskPage-header"
import TaskCard from "./Task-card"

export default function TaskPage() {
    return <div className="task-page">
        <TaskPageHeader></TaskPageHeader>
        <div className="task-sections-container">
            <div className="task-container"><div className="container-title"><h2>Pending</h2></div>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            </div>
            <div className="task-container"><div className="container-title"><h2>InProgress</h2></div></div>
            <div className="task-container"><div className="container-title"><h2>InReview</h2></div></div>
            <div className="task-container"><div className="container-title"><h2>Completed</h2></div></div>
        </div>
    </div>
}