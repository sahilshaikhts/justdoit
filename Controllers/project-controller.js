const DB_projects_handler = require("../Database/TableQueries/project-queries");
const { FindUserByEmail } = require("../Database/TableQueries/user-queries");
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
    const project_id = req.query.project_id;
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
    const project_id = req.query.project_id;
    if (project_id == null && project_id == undefined ) {
        res.status(400);
        throw new Error("No project_id found!");
    }
    const members = await DB_projects_handler.GetProjectsUsers(project_id);
    if (members && members.length > 0) {
        res.status(200).json(members);
    } else {
        res.status(400).json({ error: "Error finding project's users." });
    }
});
const AddNewUser = TryCatch(async (req, res) => {
    const { project_id, email, user_role } = req.body;
    if (project_id == null && project_id == undefined  || email == null && email == undefined ) {
        res.status(400).json({ error: "Missing required fields!" });
        throw new Error("Either project_id or email missing!");
    }

    const userExist = await FindUserByEmail(email);
    if (userExist) {
        console.log(userExist)
        const alreadyMember = await DB_projects_handler.GetUserProject(userExist.id, project_id)
        if (alreadyMember == null) {
            console.log(alreadyMember)

            const result = await DB_projects_handler.AddUserToProject(userExist.id, project_id, user_role)
            if (result) {
                res.status(200);
            } else {
                res.status(400).json({ error: "Error adding user to project!" });
            }
        }
    } else {
        res.status(400).json({ error: "User that you are adding doesn't exists!" });
    }
});

const ChangeUserRole = TryCatch(async (req, res) => {
    const project_id = req.query.project_id;
    const { user_role, user_id } = req.body;

    if (project_id !== null && user_role !== null && user_id !== null && (user_role >= 0 || user_role < 4)) {
        DB_projects_handler.ChangeUsersProjectRole(user_id, project_id,user_role)
    } else {
        res.status(400);
        ThrowErrorMissingField();
    }

});

const CreateProject = TryCatch(async (req, res) => {
    const { name, user_role } = req.body;
    if (req.user.id == null && req.user.id == undefined || user_role == null && user_role == undefined || !name) {
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
    const project_id = req.query.project_id;
    console.log(project_id);
    if (!project_newName || !project_id) {
        res.status(400);
        ThrowErrorMissingField();
    }
    const result = await DB_projects_handler.SetProjectName(project_newName, project_id);
    if (!result) {
        throw new Error("Error changing project's name. Make sure project with the id exists!");
    } else {
        res.status(200).json(result);
    }
});

const DeleteProject = TryCatch(async (req, res) => {
    const project_id = req.query.project_id;

    if (!project_id || !req.user.id) {
        res.status(400);
        ThrowErrorMissingField();
    }

    const result = await DB_projects_handler.DeleteProject(project_id);
    console.log(result);
    if (!result) {
        res.status(500);
        throw new Error("Error deleting project!");
    } else {
        res.status(200).json(result);
    }
});

function ThrowErrorMissingField() {
    throw new Error("Missing field data!");
}

module.exports = { GetProject, GetProjects, GetProjectMembers, CreateProject, ModifyProjectName, DeleteProject, AddNewUser, ChangeUserRole };