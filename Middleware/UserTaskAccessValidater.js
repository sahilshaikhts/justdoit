//Checks if user has authority to modify task.

const DB_tasks_handler = require("../Database/TableQueries/tasks-queries");
const { GetUserProjectRole } = require("../Database/TableQueries/project-queries");
const { UserRoles } = require("../constants");
const TryCatch = require("../Utils/try-catch");

//Checks if a user has the required role to access a route.
//Param bAllowIfEqualOrHigher: when true,user roles equal or above will be considered valid otherwise only allow user with exact role.
const CheckIfUserHaveAccess = (requiredRole, bAllowIfEqualOrHigher = false) => TryCatch(async (req, res, next) => {
    const user_id = req.user.id;
    const project_id = req.params.project_id;

    if (!user_id || !project_id) {
        throw new Error("Missing data!");
    } else {
        const user_role = await GetUserProjectRole(user_id, project_id);

        if (bAllowIfEqualOrHigher === true && user_role >= requiredRole) {
            next();
            return;
        } else
            if (user_role == requiredRole) {
                next();
                return;
            }

        //After all checks fail,throw error.
        HandleOnNotAuthorized(res);
    }
}
);

function HandleOnNotAuthorized(res) {
    res.status(401).json({ ErrorMessage: "User doesn't have permission for this request!" });
    throw new Error("User doesn't have permission for this request!");
}

const CheckIfUserTaskOwner = TryCatch(async (req, res, next) => {
    const user_id = req.user.id;
    const task_id = req.params.task_id;
    const project_id = req.params.project_id;

    const task = await DB_tasks_handler.GetProjectsTask(project_id, task_id);

    //Check if the memeber is assigned the task its trying to modify.
    if (task) {
        if (user_id == task.user_id) {
            next();
        } else {
            HandleOnNotAuthorized(res);
        }
    } else {
        res.status(401).json({ ErrorMessage: "Failed fetching task!" });
        throw new Error("Failed fetching task!");
    }
});

module.exports = { CheckIfUserHaveAccess, CheckIfUserTaskOwner };