const express=require("express");
const {GetProject, GetProjectMembers,GetProjects, CreateProject,ModifyProjectName,NukeProject,AddNewUser,RemoveUser,ChangeUserRole } = require("../Controllers/project-controller");
const router=express.Router();
const {CheckIfUserHaveAccess} = require("../Middleware/UserTaskAccessValidater");

router.route("/").post(CreateProject).get(GetProjects);
router.route("/get-project").get(GetProject);

router.route("/change-role").put(CheckIfUserHaveAccess(3),ChangeUserRole);
router.route("/add-member").put(CheckIfUserHaveAccess(2,true),AddNewUser);
router.route("/remove-member").put(CheckIfUserHaveAccess(3),RemoveUser);
router.route("/get-members").get(GetProjectMembers);
router.route("/change-name").put(CheckIfUserHaveAccess(3),ModifyProjectName)
router.route("/delete-project").delete(CheckIfUserHaveAccess(3),NukeProject);

router.use(require("./task-routes.js"))
module.exports=router;