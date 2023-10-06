const TryCatch = require("../Utils/try-catch")
const DB_tasks_handler = require("../Database/TableQueries/tasks-queries");


const CreateTask = TryCatch(async (req, res) => {
    const user_id = req.user.id;
    const project_id = req.params.project_id;
    const { title, description, priority } = req.body;


    if (!user_id || !project_id || !title || !priority) {
        res.status(400);
        ThrowErrorMissingField();
    }

    const result = await DB_tasks_handler.CreateTask(user_id, project_id, priority, title, description);
    if (!result) {
        res.status(200).json({ message: "Task created successfully." });
    } else {
        res.status(400);
        throw new Error("Error creating task!");
    }
});

const GetTasks = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;

    if (!project_id) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const tasks = await DB_tasks_handler.GetProjectsTasks(project_id);
    if (tasks) {
        res.status(200).json(tasks);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

const GetTask = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;

    if (!task_id || !project_id) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const tasks = await DB_tasks_handler.GetProjectsTask(project_id,task_id);

    if (tasks) {
        res.status(200).json(tasks);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

const UpdateTask = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;
    const {title,description,priority,progress,assignedUserID}=req.body;
 
    if (!project_id || !title) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const result = await DB_tasks_handler.UpdateTask(project_id, task_id,title,description,progress,priority,assignedUserID);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

const SetTaskProgress = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;
    const progress = req.body.progress;//[int] 0:low. 1: Med. 2: High.

    if (!task_id || !project_id || !progress) {
        res.status(400);
        ThrowErrorMissingField();
    }

    const result = await DB_tasks_handler.SetTasksProgress(project_id, task_id, progress);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

function ThrowErrorMissingField() {
    throw new Error("Missing required data!");
}

module.exports = { CreateTask, GetTasks, GetTask,UpdateTask,SetTaskProgress  };