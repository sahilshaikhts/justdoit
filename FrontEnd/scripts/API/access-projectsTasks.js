export async function FetchProjectTasks(aProjectID) {
    const url = `http://localhost:8383/user/project/tasks?project_id=${encodeURIComponent(aProjectID)}`

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

export async function AddNewTask(aProjectID, aTitle, aDescription, aPiority,aProgress, aAssignedUserID) {
    const url = `http://localhost:8383/user/project/tasks?project_id=${encodeURIComponent(aProjectID)}`

    const data = { "title": aTitle, "description": aDescription, "priority": aPiority,"progress":aProgress, "assignedUserID": aAssignedUserID };
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
        else
            return false;

    } catch (error) {
        console.error(error)
    }
}

export async function UpdateTask(aTaskId, aProjectID, aTitle, aDescription, aPiority, aProgress, aAssignedUserID) {
    const url = `http://localhost:8383/user/project/update-task?project_id=${encodeURIComponent(aProjectID)}&task_id=${encodeURIComponent(aTaskId)}`

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

export async function FetchProjectMembers(aProjectID) {   
     const url = `http://localhost:8383/user/project/get-members?project_id=${encodeURIComponent(aProjectID)}`

    try {
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
            });
        if (response.ok) {
            const members=await response.json()
            return members;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
