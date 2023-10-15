const database = require("../connect-db");
const { TaskProgress } = require("../../constants");

async function CreateTask(user_id, project_id, priority, progress, title, description) {
    try {
        const result = await database.query("insert into jdi.tasks(user_id,project_id,progress,priority,title,description)values(?,?,?,?,?,?)", [user_id, project_id, progress, priority, title, description]);
        if (!result)
            throw new Error("Error creating task. Check for missing field data!")
    } catch (error) {
        console.error(error);
    }
}

async function GetProjectsTasks(project_id) {
    try {
        const [result] = await database.query("select jdi.tasks.id,jdi.tasks.user_id,jdi.users.username,jdi.tasks.project_id,jdi.tasks.progress,jdi.tasks.priority,jdi.tasks.title,jdi.tasks.description from jdi.tasks left join jdi.users on jdi.tasks.user_id=jdi.users.id where jdi.tasks.project_id=?", [project_id]);

        if (!result || result.length == 0) {
            console.error("No tasks found!");
        }
        return result;

    } catch (error) {
        console.error(error);
    }
}
async function GetProjectsTask(project_id, id) {
    try {
        const [result] = await database.query("select * from jdi.tasks where project_id=? && id=?", [project_id, id]);

        if (!result || result.length == 0) {
            console.error("No tasks found!");
        }
        return result[0];
    } catch (error) {
        console.error(error);
    }
}
async function UpdateTask(project_id, id, title, description, progress, priority, user_id) {
    try {
        const [result] = await database.query("update jdi.tasks set tasks.title=?,tasks.description=?,tasks.progress=?,tasks.priority=?,user_id=? where tasks.project_id=? && id=?", [title, description, progress, priority, user_id, project_id, id]);

        if (!result || result.affectedRows == 0) {
            throw new Error("Error updating tasks!");
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
async function DeleteTask(project_id, id) {
    try {
        const [result] = await database.query("delete from jdi.tasks where tasks.project_id=? && id=?", [project_id, id]);

        if (!result || result.affectedRows == 0) {
            throw new Error("Error updating tasks!");
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
async function SetTasksProgress(project_id, id, progress) {
    try {
        const [result] = await database.query("update jdi.tasks set tasks.progress=? where project_id=? && id=?", [progress, project_id, id]);

        if (!result || result.affectedRows == 0) {
            throw new Error("Error setting task's progress!");
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { CreateTask, GetProjectsTask, GetProjectsTasks, UpdateTask,DeleteTask, SetTasksProgress }