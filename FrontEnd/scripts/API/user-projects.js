 export async function FetchUsersProject() {
    const url = "http://localhost:8383/user/project/"

    try {
        const response = await fetch(url,
            {
                method: "GET",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.ok) {
            const projects = await response.json();
            if (projects) {
                console.log(projects);
                return projects;
            }
        }
        console.warn("Couldn't fetch user's projects!");
    }
    catch (err) {
        console.error("Couldn't fetch user's projects!\n", err);
    }
}

export async function CreateNewProject(aProjectName, aUser_role = 3){
    const url = "http://localhost:8383/user/project/"

    if (!aProjectName) {
        console.error("Project name empty!");
    }
    const data = { 'name': aProjectName, 'user_role': aUser_role };

    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        if (response.ok) {
            const newProject = await response.json();
            console.log(newProject)
            return newProject[0][0];
        }else
        return null;
    }
    catch (err) {
        console.error("Error creating new project!\n", err);
    }
}
