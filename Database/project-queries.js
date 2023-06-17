const database = require("./connect-db");
const { UserRoles } = require("./constants");

async function GetUserProjects(userId) {
    try {
        result = await database.query("select * from jdi.user_projects", userId);
        if (result) {
            return result;
        } else {
            throw new Error("Error findind user's project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetUserProject(user_id, project_id) {
    try {
        result = await database.query("select * from jdi.user_projects where projects.id=? ", [user_id, project_id]);
        if (result) {
            return result;
        } else {
            throw new Error("Error finding user's project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function CreateUserProject(project_name, user_id, user_role = UserRoles.Admin) {
    try {
        const newProject = await database.query("insert into jdi.projects (name) values(?)", project_name);

        if (newProject) {
            const projectRecord = await database.query("insert into jdi.jt_users_projects (userid,projectid,user_role) values(?,?,?)", [user_id, newProject[0].insertId, user_role]);

            if (!projectRecord) {
                //Delete the new project as it won't have any owner.
                await database.query("delete from jdi.projects where id=newProject[0].insertId");

                throw new Error("Error creating record of user's project into users-projects J-table");
            } else {
                return newProject;
            }

        } else {
            throw new Error("Error creating new project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function ChangeProjectName(project_newName, project_id) {
    try {
        const result = await database.query("update jdi.projects set name=? where id=project_id", project_newName);

        if (result) {
            return result;
        } else {
            throw new Error("Error changing project's name!");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { GetUserProjects, GetUserProject, CreateUserProject ,ChangeProjectName};