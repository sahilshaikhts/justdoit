export function AddNewTask() {
    const container = document.querySelector(".container_tasks");
    const item_tempelate = document.getElementById("templ_item_task");

    const button = document.getElementsByClassName("button_addNewTask")[0];

    const nameInput = button.getElementsByTagName("input")[0];

    const newitem = item_tempelate.content.cloneNode(true);
    
    const field =newitem.querySelector(".title_task");

    field.textContent=nameInput.value;
    nameInput.value="";
    container.insertBefore(newitem,button);

    nameInput.style.visibility = "hidden";

} 


export function OnClickAddTask()
{
    const button = document.getElementsByClassName("button_addNewTask")[0];

    const nameInput = button.getElementsByTagName("input")[0];

    nameInput.style.visibility = "visible";
}
export function OnTaskNameEntered(event) {
    if (event.key === "Enter") {
        AddNewTask();
    }

}