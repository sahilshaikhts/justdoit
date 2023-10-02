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

        if (!result) {
            throw new Error("Error fetching tasks!");
        }
        return result;

    } catch (error) {
        console.log(error);
    }
}
async function GetProjectsTask(project_id, id) {
    try {
        const result = await database.query("select * from jdi.tasks where project_id=? && id=?", [project_id, id]);

        if (!result) {
            throw new Error("Error fetching tasks!");
        }
        return result[0][0];
    } catch (error) {
        console.log(error);
    }
}
async function SetTasksTitle(project_id, id, task_title) {
    try {
        const result = await database.query("update jdi.tasks set tasks.title=? where tasks.project_id=? && id=?", [task_title, project_id, id]);

        if (!result) {
            throw new Error("Error fetching tasks!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function SetTasksDescription(project_id, id, description) {
    try {
        const result = await database.query("update jdi.tasks set tasks.description=? where tasks.project_id=? && id=?", [description, project_id, id]);

        if (!result) {
            throw new Error("Error setting task's description!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}


async function SetTasksProgress(project_id, id, progress) {
    try {
        const result = await database.query("update jdi.tasks set tasks.progress=? where project_id=? && id=?", [progress, project_id, id]);

        if (!result) {
            throw new Error("Error setting task's progress!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}


async function SetTasksPriority(project_id, id, priority) {
    try {
        const result = await database.query("update jdi.tasks set tasks.priority=? where project_id=? && id=?", [priority, project_id, id]);

        if (!result) {
            throw new Error("Error setting task's progress!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}


async function SetTasksUser(project_id, id, user_id) {
    try {
        const result = await database.query("update jdi.tasks set user_id=? where project_id=? && id=?", [user_id, project_id, id]);

        if (!result) {
            throw new Error("Error setting user_id!");
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}


module.exports = { CreateTask, GetProjectsTask, GetProjectsTasks, SetTasksDescription, SetTasksProgress, SetTasksPriority, SetTasksTitle, SetTasksUser }