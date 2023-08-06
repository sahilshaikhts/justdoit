const database = require("../connect-db");
const { UserRoles } = require("../../constants");


//Queries

//Fetch user's projects.
//Params: (?: user_id)
const qr_getUsersProjects = `select jdi.projects.id,jdi.projects.name,jdi.jt_users_projects.user_role,jdi.jt_users_projects.user_id
from jdi.projects join jdi.jt_users_projects 
on jdi.jt_users_projects.project_id=jdi.projects.id
where jt_users_projects.user_id = ?`

async function GetUserProjects(userId) {
    try {
        result = await database.query(qr_getUsersProjects, userId);
        if (result[0].length>0) {
            return result;
        } else {
            console.log("Error findind user's project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetUserProject(user_id, project_id) {
    try {
        const result = await database.query(qr_getUsersProjects + " && jt_users_projects.project_id=?", [user_id, project_id]);
        console.log(result)
        if (result[0].length>0) {
            return result;
        } else {
            console.log("Error finding user's project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function CreateUserProject(project_name, user_id, user_role = UserRoles.Admin) {
    try {
        const newProject = await database.query("insert into jdi.projects (name) values(?)", project_name);

        if (result[0].length>0) {
            const projectRecord = await database.query("insert into jdi.jt_users_projects (user_id,project_id,user_role) values(?,?,?)", [user_id, newProject[0].insertId, user_role]);

            if (!projectRecord) {
                //Delete the new project as it won't have any owner.
                await database.query("delete from jdi.projects where id=newProject[0].insertId");

                console.log("Error creating record of user's project into users-projects J-table");
            } else {
                return newProject;
            }

        } else {
            console.log("Error creating new project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function SetProjectName(project_newName, project_id) {
    try {
        const result = await database.query("update jdi.projects set name=? where id=?", [project_newName, project_id]);

        if (result[0].length>0) {
            return result;
        } else {
            console.log("Error changing project's name!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function DeleteProject(project_id) {
    try {
        const result = await database.query("delete from jdi.projects where id=?", project_id);

        if (result[0].length>0) {
            return result;
        } else {
            console.log("Error deleting record!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function CheckIfUserHasProject(user_id, project_id) {
    try {
        const result = await database.query("select * from jdi.jt_users_projects where user_id=? && project_id=?", user_id, project_id);

        if (result[0].length>0) {
            return result;
        } else {
            console.log("User doesn't have access to the project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetUserProjectRole(user_id, project_id) {
    try {
        const result = await database.query("select * from jdi.jt_users_projects where jdi.jt_users_projects.user_id=? AND jdi.jt_users_projects.project_id=?",[ user_id, project_id]);
        if (result[0].length>0) {
            return result[0][0].user_role;
        } else {
            console.error("Cannont find user in the project!");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetUserProjects, GetUserProject, CreateUserProject, SetProjectName, DeleteProject,GetUserProjectRole };