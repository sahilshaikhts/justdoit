const database = require("../connect-db");
const { TaskProgress } = require("../../constants");

async function CreateTask(user_id, project_id, priority, title, description) {
    try {
        console.log(user_id, project_id, priority, title, description)
        const result = await database.query("insert into jdi.tasks(user_id,project_id,progress,priority,title,description)values(?,?,?,?,?,?)", [user_id, project_id, TaskProgress.Pending, priority, title, description]);
        if (!result)
            throw new Error("Error creating task. Check for missing field data!")
    } catch (error) {
        console.log(error);
    }
}

async function GetProjectsTasks(project_id) {
    try {
        const [result] = await database.query("select * from jdi.tasks where jdi.tasks.project_id=?", [project_id]);

        if (!result || result.length == 0) {
            throw new Error("Error fetching tasks!");
        }
        return result;

    } catch (error) {
        console.log(error);
    }
}
async function GetProjectsTask(project_id, id) {
    try {
        const [result] = await database.query("select * from jdi.tasks where project_id=? && id=?", [project_id, id]);

        if (!result || result.length == 0) {
            throw new Error("Error fetching tasks!");
        }
        return result[0];
    } catch (error) {
        console.log(error);
    }
}
async function UpdateTask(project_id, id, title, description, progress, priority, user_id) {
    try {
        const [result] = await database.query("update jdi.tasks set tasks.title=?,tasks.description=?,tasks.progress=?,tasks.priority=?,user_id=? where tasks.project_id=? && id=?", [title, description, progress, priority, user_id, project_id, id]);

        if (!result || result.affectedRows==0) {
            throw new Error("Error updating tasks!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}
async function SetTasksProgress(project_id, id, progress) {
    try {
        const [result] = await database.query("update jdi.tasks set tasks.progress=? where project_id=? && id=?", [progress, project_id, id]);

        if (!result || result.affectedRows==0) {
            throw new Error("Error setting task's progress!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { CreateTask, GetProjectsTask, GetProjectsTasks, UpdateTask,SetTasksProgress }