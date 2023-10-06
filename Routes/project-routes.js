const express=require("express");
const { GetProject,GetProjectMembers,GetProjects, CreateProject,ModifyProjectName,DeleteProject,AddNewUser } = require("../Controllers/project-controller");
const router=express.Router();

router.route("/").post(CreateProject).get(GetProjects);
router.route("/:project_id").get(GetProject);

router.route("/add-member").put(AddNewUser);
router.route("/:project_id/get-members").get(GetProjectMembers);
router.route("/:project_id/settings").put(ModifyProjectName).delete(DeleteProject);
router.use(require("./task-routes.js"))
module.exports=router;