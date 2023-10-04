const router = require("express").Router({ mergeParams: true });
const { GetTasks,GetTask, CreateTask,UpdateTask,SetTaskProgress } = require("../Controllers/tasks-controller");
const {CheckIfUserHaveAccess,CheckIfUserTaskOwner} = require("../Middleware/UserTaskAccessValidater");
const { UserRoles } = require("../constants");


router.route("/:project_id/tasks").get(CheckIfUserHaveAccess(UserRoles.Viewer,true),GetTasks).post(CheckIfUserHaveAccess(UserRoles.Viewer,true),CreateTask);
router.route("/:task_id").get(CheckIfUserHaveAccess(UserRoles.Viewer,true),GetTask);

router.route("/:project_id/:task_id/update-task").put(CheckIfUserHaveAccess(UserRoles.Moderator,true),UpdateTask);

//Todo: switch checkAcesse with checktaskowner and test
router.route("/:task_id/Edit-progress").put(CheckIfUserHaveAccess(UserRoles.Member,true),CheckIfUserTaskOwner,SetTaskProgress);


module.exports = router;