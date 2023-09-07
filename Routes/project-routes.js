const express=require("express");
const TryCatch = require("../Utils/try-catch");
const { GetProject,GetProjects, CreateProject,ModifyProjectName,DeleteProject } = require("../Controllers/project-controller");
const router=express.Router();

router.route("/").post(CreateProject).get(GetProjects);

router.route("/:project_id/settings").put(ModifyProjectName).delete(DeleteProject);

module.exports=router;