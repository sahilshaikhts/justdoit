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
        [result] = await database.query(qr_getUsersProjects, userId);
        console.log(result)
        if (result.length > 0) {
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
        const [result] = await database.query(qr_getUsersProjects + " && jt_users_projects.project_id=?", [user_id, project_id]);
        if (result && result.length > 0) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
async function GetProjectsUsers(project_id) {
    try {
        const [result] = await database.query(`select jdi.jt_users_projects.user_id,jdi.users.username,jdi.jt_users_projects.user_role from jdi.users INNER join jdi.jt_users_projects on jdi.users.id=jdi.jt_users_projects.user_id LEFT join jdi.user_files on jdi.users.id=jdi.user_files.userID where jdi.jt_users_projects.project_id=?`, [project_id]);
        if (result.length > 0) {
            return result
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
async function CreateUserProject(project_name, user_id, user_role = UserRoles.Admin) {
    try {
        const [newProject] = await database.query("insert into jdi.projects (name) values(?)", project_name);
        if (newProject.affectedRows === 1) {
            const [projectRecord] = await database.query("insert into jdi.jt_users_projects (user_id,project_id,user_role) values(?,?,?)", [user_id, newProject.insertId, user_role]);

            if (projectRecord.affectedRows === 1) {
                return newProject;
            } else {
                //Delete the new project as it won't have any owner.
                await database.query("delete from jdi.projects where id=?", [newProject.insertId]);
                throw Error("Error creating record of user's project into users-projects J-table");
            }

        } else {
            throw Error("Error creating new project!");
        }
    } catch (error) {
        console.error(error);
    }
}

async function SetProjectName(project_newName, project_id) {
    try {
        const [result] = await database.query("update jdi.projects set name=? where id=?", [project_newName, project_id]);

        if (result.affectedRows === 1) {
            return result;
        } else {
            throw Error("Error changing project's name!");
        }
    } catch (error) {
        console.error(error);
    }
}

async function DeleteProject(project_id) {
    try {
        const [result] = await database.query("delete from jdi.projects where id=?", project_id);

        if (result.affectedRows === 1) {
            return result;
        } else {
            throw Error("Error deleting record!");
        }
    } catch (error) {
        console.error(error);
    }
}
async function AddUserToProject(user_id, project_id, user_role) {
    try {
        const [projectRecord] = await database.query("insert into jdi.jt_users_projects (user_id,project_id,user_role) values(?,?,?)", [user_id, project_id, user_role]);
        if (projectRecord.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}
async function ChangeUsersProjectRole(user_id, project_id, user_role) {
    try {
        const [projectRecord] = await database.query("update jdi.jt_users_projects set user_role=? where project_id=? AND user_id=?", [user_role,project_id,user_id]);
        if (projectRecord.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}
async function GetUserProjectRole(user_id, project_id) {
    try {
        const result = await database.query("select * from jdi.jt_users_projects where jdi.jt_users_projects.user_id=? AND jdi.jt_users_projects.project_id=?", [user_id, project_id]);
        if (result[0].length > 0) {
            return result[0][0].user_role;
        } else {
            throw Error("Cannont find user in the project!");
        }
    } catch (error) {
        console.error(error);
    }
}

const GetProjectUsersPPs = async (aProject_id) => {
    try {
        const [queryData] = await database.query("select jdi.user_files.fileName,jdi.user_files.fileType from  jdi.user_files join jdi.jt_users_projects on jdi.jt_users_projects.user_id=jdi.user_files.userID where jdi_where jt_users_projects.project_id=? ", [aProject_id])
        if (queryData && queryData.length>0)
            return queryData;
        else
            return null;

    } catch (error) {
        console.error(error);
    }
}

module.exports = { GetUserProjects, GetUserProject, GetProjectsUsers, CreateUserProject, SetProjectName, DeleteProject, GetUserProjectRole,GetProjectUsersPPs, AddUserToProject,ChangeUsersProjectRole };