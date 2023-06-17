const express=require("express");
const TryCatch = require("../Utils/try-catch");
const { GetProject,GetProjects, CreateProject,ModifyProjectName } = require("../Controllers/project-controller");
const router=express.Router();

router.route("/").post(CreateProject).put(ModifyProjectName).get(GetProjects);

router.route("/:project_id").get(GetProject);

module.exports=router;