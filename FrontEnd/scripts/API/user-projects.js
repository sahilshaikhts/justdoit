export async function FetchUsersProjects() {
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
                return projects;
            }
        }
        console.warn("Couldn't fetch user's projects!");
    }
    catch (err) {
        console.error("Couldn't fetch user's projects!\n", err);
    }
}
export async function FetchUsersProject(project_id) {
    const url = `http://localhost:8383/user/project/get-project?project_id=${encodeURIComponent(project_id)}`

    try {
        const response = await fetch(url,
            {                        
                method: "GET",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
        if (response.ok) {
            const project = await response.json();
            if (project) {
                return project;
            }
        }
        console.warn("Couldn't fetch user's project!");
    }
    catch (err) {
        console.error("Couldn't fetch user's projects!\n", err);
    }
}
export async function CreateNewProject(aProjectName, aUser_role = 3) {
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
        } else
            return null;
    }
    catch (err) {
        console.error("Error creating new project!\n", err);
    }
}


export async function AddMemberToProject(aProjectID, aEmail, aUser_role) {
    const url = `http://localhost:8383/user/project/add-member?project_id=${encodeURIComponent(aProjectID)}`
    const data = { project_id: aProjectID, email: aEmail, user_role: aUser_role }
    try {
        const response = await fetch(url,
            {
                method: "PUT",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
        if (response && response.ok) {
            return true;
        } else
            return false;

    } catch (error) {
        console.error(error);
    }
}
export async function RemoveMemberFromProject(aProjectID, user_id) {
    const url = `http://localhost:8383/user/project/remove-member?project_id=${encodeURIComponent(aProjectID)}`
    const data = { project_id: aProjectID, user_id: user_id}
    try {
        const response = await fetch(url,
            {
                method: "PUT",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
        if (response && response.ok) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function NukeProject(aProjectID) {
    const url = `http://localhost:8383/user/project/delete-project?project_id=${encodeURIComponent(aProjectID)}`
    const data = { project_id: aProjectID}
    try {
        const response = await fetch(url,
            {
                method: "DELETE",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
        if (response && response.ok) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

