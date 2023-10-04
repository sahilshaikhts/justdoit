const DB_projects_handler = require("../Database/TableQueries/project-queries");
const TryCatch = require("../Utils/try-catch");

const GetProjects = TryCatch(async (req, res) => {

    if (!req.user.id) {
        res.status(400);
        throw new Error("Missing user.id");
    }
    const result = await DB_projects_handler.GetUserProjects(req.user.id);

    if (result) {
        res.status(200).json(result);
    } else {
        throw new Error("Couldn't retrive user's projects");
    }

});

const GetProject = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;

    if (!req.user.id || !project_id) {
        res.status(400);
        ThrowErrorMissingField();
    }

    const result = await DB_projects_handler.GetUserProject(req.user.id, project_id);
    if (result) {
        res.status(200).json(result[0]);
    } else {
        throw new Error("Couldn't retrive user's projects");
    }

});

const GetProjectMembers = TryCatch(async (req, res) => {
    const project_id = req.params.project_id;
    if (!project_id) {
        res.status(400);
        throw new Error("No project_id found!");
    }
    const members = await DB_projects_handler.GetProjectsUsers(project_id);
    console.log(members,project_id)
    if(members && members.length>0)
    {
        res.status(200).json(members);
    }else
    {
        res.status(400).json({message:"Error finding project's users."});
    }
});

const CreateProject = TryCatch(async (req, res) => {
    const { name, user_role } = req.body;
    if (!req.user.id || !user_role || !name) {
        res.status(400);
        ThrowErrorMissingField();
    }

    const result = await DB_projects_handler.CreateUserProject(name, req.user.id, user_role);
    const newProject = await DB_projects_handler.GetUserProject(req.user.id, result.insertId);

    if (result) {
        res.status(201).json(newProject);
    } else {
        throw new Error("Couldn't create project!");
    }

});

const ModifyProjectName = TryCatch(async (req, res) => {
    const { project_newName } = req.body;
    const project_id=req.params.project_id;
    console.log(project_id);
    if (!project_newName || !project_id) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const result = await DB_projects_handler.SetProjectName(project_newName, project_id);
    if (!result) {
        throw new Error("Error changing project's name. Make sure project with the id exists!");
    }else
    {
        res.status(200).json(result);
    }
});

const DeleteProject = TryCatch(async (req, res) => {
    const project_id =req.params.project_id;

    if (!project_id || !req.user.id) {
        res.status(400);
        ThrowErrorMissingField();
    }
    
    const result = await DB_projects_handler.DeleteProject(project_id);
    console.log(result);
    if (!result) {
        res.status(500);
        throw new Error("Error deleting project!");
    }else
    {
        res.status(200).json(result);
    }
});

function ThrowErrorMissingField()
{
    throw new Error("Missing field data!");
}

module.exports = { GetProject, GetProjects,GetProjectMembers, CreateProject, ModifyProjectName,DeleteProject };