const router = require("express").Router({ mergeParams: true });
const { GetTasks,GetTask, CreateTask,UpdateTask,SetTaskProgress } = require("../Controllers/tasks-controller");
const {CheckIfUserHaveAccess,CheckIfUserTaskOwner} = require("../Middleware/UserTaskAccessValidater");
const { UserRoles } = require("../constants");

router.route("/tasks").get(CheckIfUserHaveAccess(UserRoles.Viewer,true),GetTasks).post(CheckIfUserHaveAccess(UserRoles.Viewer,true),CreateTask);

router.route("/update-task").put(CheckIfUserHaveAccess(UserRoles.Moderator,true),UpdateTask);

//Todo: switch checkAcesse with checktaskowner and test
router.route("/Edit-progress").put(CheckIfUserHaveAccess(UserRoles.Member,true),CheckIfUserTaskOwner,SetTaskProgress);


module.exports = router;