import React, { useState } from "react";
import Filter_project from "./Filter-project";
export default function ProjectPage() {
    const [bNewProjectButton, SetVisNewProjectBtn] = useState(false);
    function AddNewTask() {
        const container = document.querySelector(".container_tasks");
        const item_tempelate = document.getElementById("templ_item_task");

        const button = document.getElementsByClassName("button_addNewTask")[0];

        const nameInput = button.getElementsByTagName("input")[0];

        const newitem = item_tempelate.content.cloneNode(true);

        const field = newitem.querySelector(".title_task");

        field.textContent = nameInput.value;
        nameInput.value = "";
        container.insertBefore(newitem, button);

        nameInput.style.visibility = "hidden";

    }


    function OnClickAddTask() {
        const button = document.getElementsByClassName("button_addNewTask")[0];

        const nameInput = button.getElementsByTagName("input")[0];

        nameInput.style.visibility = "visible";
    }
    function OnTaskNameEntered(event) {
        if (event.key === "Enter") {
            AddNewTask();
        }

    }

    return (
        <>
            <Filter_project></Filter_project>
            <div className="container_tasks">
                <div className="button_addNewTask" onclick={OnClickAddTask}>
                    <input type="text" onKeyDown={OnTaskNameEntered} placeholder="Task's details.." />
                </div>
            </div>
        </>
    );
}