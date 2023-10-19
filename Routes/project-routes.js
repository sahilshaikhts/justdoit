const express=require("express");
const { GetProject,GetProjectMembers,GetProjects, CreateProject,ModifyProjectName,DeleteProject,AddNewUser,RemoveUser,ChangeUserRole } = require("../Controllers/project-controller");
const router=express.Router();

router.route("/").post(CreateProject).get(GetProjects);

router.route("/change-role").put(ChangeUserRole);
router.route("/add-member").put(AddNewUser);
router.route("/remove-member").put(RemoveUser);
router.route("/get-members").get(GetProjectMembers);
router.route("/settings").put(ModifyProjectName).delete(DeleteProject);

router.use(require("./task-routes.js"))
module.exports=router;