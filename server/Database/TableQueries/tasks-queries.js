const taskDB = require("../Models/tasks.js");
const { TaskProgress } = require("../../constants");

async function CreateTask(user_id, project_id, priority, progress, title, description) {
    try {
        const result =await new taskDB({ user_id: user_id, project_id: project_id, progress: progress, priority: priority, title: title, description: description }).save();
        if (!result)
            throw new Error("Error creating task. Check for missing field data!")
    } catch (error) {
        console.error(error);
    }
}

async function GetProjectsTasks(project_id) {
    try {
        const result = await taskDB.find({ project_id: project_id }).populate('user_id', 'username');
        if (result.length == 0) {
            console.error("No tasks found!");
        } {
            const list = result.map((item) => {
                 return { id: item._id, user_id:item.user_id?item.user_id._id : undefined, username: item.user_id?item.user_id.username : undefined, title: item.title, project_id: item.project_id, progress: item.progress, priority: item.priority, description: item.description } })
            return list;
        }
    } catch (error) {
        console.error(error);
    }
}
async function GetProjectsTask(project_id, id) {
    try {
        const result = await taskDB.findOne({_id:id, project_id: project_id }).populate('user_id', 'username');

        if (!result || result.length == 0) {
            console.error("No tasks found!");
        }
        return { id: result._id, user_id: result.user_id?result.user_id._id : null, username: item.user_id?item.user_id.username : undefined, title: result.title, project_id: result.project_id, progress: result.progress, priority: result.priority, description: result.description };
    } catch (error) {
        console.error(error);
    }
}
async function UpdateTask(project_id, id, atitle, adescription, progress, priority, user_id) {
    try {
        const result = await taskDB.updateOne({project_id:project_id,_id:id},{title:atitle, description:adescription, progress:progress, priority:priority, user_id:user_id})
        
        if (!result || result.matchedCount == 0) {
            throw new Error("Error updating tasks!");
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
async function DeleteTask(project_id, id) {
    try {
        const result =await taskDB.deleteOne({_id:id,project_id:project_id});

        if (!result || result.deletedRows == 0) {
            throw new Error("Error updating tasks!");
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}
async function DeleteAllProjectTask(project_id) {
    try {
        const result =await taskDB.deleteMany({project_id:project_id});

        if (!result) {
            throw new Error("Error updating tasks!");
        }
        return true;
    } catch (error) {
        console.error(error);
    }
}

async function SetTasksProgress(project_id, id, progress) {
    try {
        const result =await taskDB.updateOne({_id:id,project_id:project_id},{progress:progress});

        if (!result || result.modifiedCount == 0) {
            throw new Error("Error setting task's progress!");
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { CreateTask, GetProjectsTask, GetProjectsTasks, UpdateTask, DeleteTask, DeleteAllProjectTask, SetTasksProgress }