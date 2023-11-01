import { base_url } from "../constants";

export async function FetchProjectTasks(aProjectID) {
    const url = `${base_url}/user/project/tasks?project_id=${encodeURIComponent(aProjectID)}`

    try {
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
                headers: { "content-Type": "application/json" }
            });

        if (response.ok) {
            const tasks = await response.json();
            return tasks;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function AddNewTask(aProjectID, aTitle, aDescription, aPiority, aProgress, aAssignedUserID) {
    const url = `${base_url}/user/project/tasks?project_id=${encodeURIComponent(aProjectID)}`

    const data = { "title": aTitle, "description": aDescription, "priority": aPiority, "progress": aProgress, "assignedUserID": aAssignedUserID };
    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: "include",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(data)
            }

        );
        if (response.ok)
            return true


        if (response.status === 401 || response.status === 403) {
            throw new Error("User not allowed to add new task");
        }

    } catch (error) {
        console.error(error)
    }
}

export async function UpdateTask(aTaskId, aProjectID, aTitle, aDescription, aPiority, aProgress, aAssignedUserID) {
    const url = `${base_url}/user/project/update-task?project_id=${encodeURIComponent(aProjectID)}&task_id=${encodeURIComponent(aTaskId)}`

    const data = { "title": aTitle, "description": aDescription, "priority": aPiority, "progress": aProgress, "assignedUserID": aAssignedUserID }
    try {
        const response = await fetch(url,
            {
                method: "PUT",
                credentials: "include",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }

}

export async function DeleteTask(aTaskId, aProjectID) {
    const url = `${base_url}/user/project/delete-task?project_id=${encodeURIComponent(aProjectID)}&task_id=${encodeURIComponent(aTaskId)}`

    try {
        const response = await fetch(url,
            {
                method: "PUT",
                credentials: "include",
                headers: { "content-Type": "application/json" },
            }
        );
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }

}
export async function FetchProjectMembers(aProjectID) {
    const url = `${base_url}/user/project/get-members?project_id=${encodeURIComponent(aProjectID)}`
    try {
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
            });
        if (response.ok) {
            const members = await response.json()
            return members;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
