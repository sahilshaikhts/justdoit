export async function FetchProjectTasks(aProjectID) {
    const url = "http://localhost:8383/user/project/" + aProjectID + "/tasks"
    try {
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
                headers: { "content-Type": "application/json" }
            });

        if (response && response.ok) {
            const tasks = await response.json();
            return tasks;
        }

    } catch (error) {
        console.error(error);
    }
}

export async function AddNewTask(aProjectID,aTitle, aDescription, aPiority) {
    const url = "http://localhost:8383/user/project/" + aProjectID + "/tasks"

    const data = { "title": aTitle,  "description": aDescription, "priority": aPiority };
    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: "include",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(data)
            }

        );
        if (response && response.ok)
            return true
        else
            return false;
        
    } catch (error) {
        console.log(error)
    }
}
