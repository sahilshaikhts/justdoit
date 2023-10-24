const DB_projects_handler = require("../Database/TableQueries/project-queries");
const DB_tasks_handler = require("../Database/TableQueries/tasks-queries");

const { FindUserByEmail } = require("../Database/TableQueries/user-queries");
const TryCatch = require("../Utils/try-catch");

const GetProjects = TryCatch(async (req, res) => {

    if (!req.user.id) {
        res.status(400).json({error:"Missing authenticated user's id."});
        console.error("Missing user.id");
    }
    const result = await DB_projects_handler.GetUserProjects(req.user.id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(202).end();
        console.error("Couldn't retrive user's projects");
    }

});

const GetProject = TryCatch(async (req, res) => {
    const project_id = req.query.project_id;
    if ((req.user.id === null && req.user.id === undefined) || (project_id === null && project_id === undefined)) {
        res.status(400).end();
        console.error("Missing authenticated user's id or project_id");
    }

    const result = await DB_projects_handler.GetUserProject(req.user.id, project_id);
    if (result) {
        res.status(200).json(result[0]);
    } else {
        res.status(202).end();
        console.error("Couldn't retrive user's projects");
    }

});

const GetProjectMembers = TryCatch(async (req, res) => {
    const project_id = req.query.project_id;
    
    if (project_id === null && project_id === undefined ) {
        res.status(400).json({error:"No project_id found"});
        console.error("No project_id found");
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
    if (project_id === null && project_id === undefined  || email === null && email === undefined ) {
        res.status(400).json({ error: "Missing required fields!" });
        throw new Error("Either project_id or email missing!");
    }

    const userExist = await FindUserByEmail(email);
    if (userExist) {
        const alreadyMember = await DB_projects_handler.GetUserProject(userExist.id, project_id)
        if (alreadyMember == null) {

            const result = await DB_projects_handler.AddUserToProject(userExist.id, project_id, user_role)
            if (result) {
                res.status(200).end();
            } else {
                res.status(400).json({ error: "Error adding user to project!" });
            }
        }
    } else {
        res.status(400).json({ error: "User that you are adding doesn't exists!" });
    }
});

const RemoveUser = TryCatch(async (req, res) => {
    const { project_id, user_id } = req.body;

    if (project_id === null && project_id === undefined || user_id === null && user_id === undefined) {
        res.status(400).json({ error: "Missing required fields!" });
        throw new Error("Either project_id or user_id missing!");
    }

    const userToRemove = await DB_projects_handler.GetProjectsUser(project_id, user_id);

    if (userToRemove) {
        let bAnotherAdminExists = false;

        console.log("Role ",userToRemove)
        if (userToRemove.user_role === 3) {
           
            bAnotherAdminExists = false;//reinitialize it to false.
            const allMembers = await DB_projects_handler.GetProjectsUsers(project_id);

            //Check all the other members for admin role.
            for (let index = 0; index < allMembers.length; index++) {
                const member = allMembers[index];

                //Check if its not the same user as the one being removed.
                if (member.user_id !== userToRemove.user_id) {
                    if (member.user_role === 3) {
                        bAnotherAdminExists = true;
                        break;
                    }
                }
            }
        }else
        bAnotherAdminExists=true;
        
        if (bAnotherAdminExists) {
            const result = await DB_projects_handler.RemoveUserFromProject(user_id, project_id)
            if (result) {
                res.status(200).end();
            } else {
                res.status(202).json({ Message: "User doesn't exists in the project!" });
            }
        } else
            res.status(400).json({ Error: "Make sure there is another admin in the project if removing an admin user." });
    }else
    {
        res.status(202).json({ Message: "User doesn't exists in the project!" });
    }
});

const ChangeUserRole = TryCatch(async (req, res) => {
    const project_id = req.query.project_id;
    const { user_role, user_id } = req.body;

    if (project_id !== undefined && user_role !== undefined && user_id !== undefined && (user_role >= 0 || user_role < 4)) {
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

const NukeProject = TryCatch(async (req, res) => {
    const project_id = req.query.project_id;

    if (project_id === null  || project_id === undefined ) {
        res.status(400);
        ThrowErrorMissingField();
    }
    
    const bUsersRemoved = await DB_projects_handler.RemoveAllUsersFromProject(project_id);
    
    if (bUsersRemoved) {
        const bTaskRemoved = await DB_tasks_handler.DeleteAllProjectTask(project_id);
        if (bTaskRemoved) {
            const bProjectRemoved = await DB_projects_handler.DeleteProject(project_id);
            if (bProjectRemoved) {
                res.status(200).json({ message: "Project succesfully nuked!!" });
            }
        }
    }
    if(bUsersRemoved || bTaskRemoved || bProjectRemoved) {
        res.status(500).json({ error: "Fatal error: Error removing project's users and or tasks" });
        throw new Error("Fatal error: Error removing project's users and or tasks. Check records to remove floating or corrupt records.");
    }
});

function ThrowErrorMissingField() {
    throw new Error("Missing field data!");
}

module.exports = { GetProject, GetProjects, GetProjectMembers, CreateProject, ModifyProjectName, NukeProject, AddNewUser,RemoveUser, ChangeUserRole };