export async function FetchProjectTasks(aProjectID) {
    const url = "http://localhost:8383/user/project/" + aProjectID + "/tasks"
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

export async function AddNewTask(aProjectID, aTitle, aDescription, aPiority, aAssignedUserID) {
    const url = "http://localhost:8383/user/project/" + aProjectID + "/tasks"

    const data = { "title": aTitle, "description": aDescription, "priority": aPiority, "assignedUserID": aAssignedUserID };
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
    const url = "http://localhost:8383/user/project/" + aProjectID + "/" + aTaskId + "/update-task"

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
    const url = "http://localhost:8383/user/project/" + aProjectID + "/get-members"
    try {
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
            });
        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
