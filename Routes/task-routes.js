const router = require("express").Router({ mergeParams: true });
const { GetTasks,GetTask, CreateTask,SetTaskDescription,SetTaskTitle,SetTaskPriority,SetTaskProgress,SetTaskUser } = require("../Controllers/tasks-controller");
const {CheckIfUserHaveAccess,CheckIfUserTaskOwner} = require("../Middleware/UserTaskAccessValidater");
const { UserRoles } = require("../constants");


router.route("/").get(CheckIfUserHaveAccess(UserRoles.Viewer,true),GetTasks).post(CheckIfUserHaveAccess(UserRoles.Viewer,true),CreateTask);
router.route("/:task_id").get(CheckIfUserHaveAccess(UserRoles.Viewer,true),GetTask);

router.route("/:task_id/Edit-title").put(CheckIfUserHaveAccess(UserRoles.Moderator,true),SetTaskTitle);
router.route("/:task_id/Edit-description").put(CheckIfUserHaveAccess(UserRoles.Moderator,true),SetTaskDescription);
router.route("/:task_id/Edit-priority").put(CheckIfUserHaveAccess(UserRoles.Moderator,true),SetTaskPriority);
router.route("/:task_id/Edit-progress").put(CheckIfUserHaveAccess(UserRoles.Member,true),CheckIfUserTaskOwner,SetTaskProgress);

router.route("/:task_id/Edit-user").put(CheckIfUserHaveAccess(UserRoles.Admin),SetTaskUser);

module.exports = router;