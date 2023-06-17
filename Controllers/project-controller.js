const { GetUserProjects, GetUserProject, CreateUserProject,ChangeProjectName } = require("../Database/project-queries");
const TryCatch = require("../Utils/try-catch");

const GetProjects = TryCatch(async (req, res, next) => {
    const user_id = req.body.user_id;
    if (!user_id) {
        throw new Error("Missing user_id");
    }
    const result = await GetUserProjects(user_id);

    if (result) {
        res.status(200).json(result);
    } else {
        throw new Error("Couldn't retrive user's projects");
    }

});

const GetProject = TryCatch(async (req, res, next) => {
    const user_id = req.body.userId;
    const project_id = req.params.project_id;

    if (!user_id || !projectId) {
        throw new Error("Missing either userID or projectID!");
    }

    const result = await GetUserProject(user_id,);
    if (result) {
        res.status(200).json(result);
    } else {
        throw new Error("Couldn't retrive user's projects");
    }

});

const CreateProject = TryCatch(async (req, res, next) => {
    const { project_name, user_id, user_role } = req.body;

    if (!user_id || !user_role || !project_name) {
        throw new Error("Missing project_name, user_id or user_role!");
    }

    const result = await CreateUserProject(project_name, user_id, user_role);
    if (result) {
        res.status(200).json(result);
    } else {
        throw new Error("Couldn't create project!");
    }

});

const ModifyProjectName = TryCatch(async (req, res, next) => {
    const { project_newName, project_id } = req.body;
    if (!project_newName || !project_id) {
        throw new Error("Missing project_newName or project_id!");
    }
    const result =await ChangeProjectName(pro)
});

module.exports = { GetProject, GetProjects, CreateProject,ModifyProjectName };