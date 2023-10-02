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
    console.log("project_id ",project_id)

    if (!project_id) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const tasks = await DB_tasks_handler.GetProjectsTasks(project_id);
    console.log(tasks)
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
    const tasks = await DB_tasks_handler.GetProjectsTasks(15);

    if (tasks) {
        res.status(200).json(tasks);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

const SetTaskTitle = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;
    const title = req.body.task_title;


    if (!project_id || !title) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const result = await DB_tasks_handler.SetTasksTitle(project_id, task_id, title);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

const SetTaskDescription = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;
    const description = req.body.task_description;


    if (!task_id || !project_id || !description) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const result = await DB_tasks_handler.SetTasksDescription(project_id, task_id, description);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(400);
        throw new Error("Error fetching project's tasks.")
    }
});

const SetTaskPriority = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;
    const priority = req.body.task_priority;//[int] 0:low. 1: Med. 2: High.


    if (!task_id || !project_id || !priority) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const result = await DB_tasks_handler.SetTasksPriority(project_id, task_id, priority);

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
    const progress = req.body.task_progress;//[int] 0:low. 1: Med. 2: High.

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

const SetTaskUser = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    const task_id = req.params.task_id;
    const newUser_id = req.body.task_newUser;

    if (!newUser_id || !project_id || !task_id) {
        res.status(400);
        ThrowErrorMissingField();
    }

    const result = await DB_tasks_handler.SetTasksUser(project_id, task_id, newUser_id);

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

module.exports = { CreateTask, GetTasks, GetTask, SetTaskTitle, SetTaskDescription, SetTaskPriority, SetTaskProgress, SetTaskUser };