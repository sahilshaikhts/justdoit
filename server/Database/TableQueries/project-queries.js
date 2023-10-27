const userprojectsDB = require("../Models/UsersProject.js");
const projectsDB = require("../Models/projects.js");
const tasksDB=require("../Models/tasks.js");
const userFilesDB=require("../Models/User-files.js");
const { UserRoles } = require("../../constants");


//Queries

//Fetch user's projects.
//Params: (?: user_id)
const qr_getUsersProjects = `select jdi.projects.id,jdi.projects.name,jdi.jt_users_projects.user_role,jdi.jt_users_projects.user_id
from jdi.projects join jdi.jt_users_projects 
on jdi.jt_users_projects.project_id=jdi.projects.id
where jt_users_projects.user_id = ?`

async function GetUserProjects(userId) {
    try {
        const result = await userprojectsDB.find({ user_id: userId }).populate('project_id');
        if (result) {
            const list = result.map((item) => {
                return { id: item.project_id._id, user_id: item.user_id, name: item.project_id.name, user_role: item.project_id.user_role }
            });
            return list;
        } else {
            console.log("Error findind user's project!");
        }
    } catch (error) {
        console.log(error);
    }
}

async function GetUserProject(user_id, project_id) {
    try {
        const result = await userprojectsDB.findOne({ user_id: user_id, project_id: project_id }).populate('project_id')

        if (result) {
            return { id: result.project_id._id, user_id: result.user_id, name: result.project_id.name, user_role: result.project_id.user_role };
        } else {
            console.log("Error findind user's project!");
        }
    } catch (error) {
        console.log(error);
    }
}
async function GetProjectsUsers(project_id) {
    try {
        const result =await userprojectsDB.find({project_id:project_id}).populate('user_id','username')
        
        if (result.length > 0) {
            const list = result.map((item) => {
                return { user_id: item.user_id._id, username: item.user_id.username, user_role: item.user_role }
            });

            return list;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
async function GetProjectsUser(project_id, user_id) {
    try {
        const result =await userprojectsDB.findOne({project_id:project_id,user_id:user_id}).populate('user_id','username')
        if (result) {
            return { user_id: result.user_id._id, username: result.user_id.username, user_role: result.project_id.user_role }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
async function CreateUserProject(project_name, user_id, user_role = UserRoles.Admin) {
    try {
        const newProject = await new projectsDB({ name: project_name }).save();
        if (newProject) {
            const projectRecord = await new userprojectsDB({ user_id: user_id, project_id: newProject._id, user_role: user_role }).save();

            if (projectRecord) {
                return {project_id:newProject._id,name:newProject.name};
            } else {
                //Delete the new project as it won't have any owner.
                await projectsDB.deleteOne({ _id: newProject._id });
                return false;
            }

        } else {
            throw Error("Error creating new project!");
        }
    } catch (error) {
        console.error(error);
    }
}
async function SetProjectName(project_newName, project_id) {
    try {
        const result = await projectsDB.findByIdAndUpdate(project_id,{name:project_newName});

        if (result) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

async function DeleteProject(project_id) {
    try {
        const result =await projectsDB.deleteOne({project_id:project_id});

        if (result.deletedCount>0) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}
async function AddUserToProject(user_id, project_id, user_role) {
    try {
        const projectRecord =await new userprojectsDB({user_id:user_id,project_id:project_id,user_role:user_role}).save();

        if (projectRecord) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}

async function RemoveUserFromProject(user_id, project_id) {
    try {
        const projectRecord = await userprojectsDB.deleteOne({ user_id: user_id, project_id: project_id });
        const taskRecordUpdate = await tasksDB.updateMany({project_id:project_id,user_id:user_id},{user_id:null});

        if (projectRecord.deletedCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}
async function RemoveAllUsersFromProject(project_id) {
    try {
        const projectRecord = await userprojectsDB.deleteMany({project_id:project_id});
        
        if (projectRecord.deletedCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}
async function ChangeUsersProjectRole(user_id, project_id, user_role) {
    try {
        const projectRecord = await userprojectsDB.updateOne({project_id:project_id,user_id:user_id},{user_role:user_role});
        if (projectRecord.modifiedCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
}
async function GetUserProjectRole(user_id, project_id) {
    try {
        const result = await userprojectsDB.findOne({project_id:project_id,user_id:user_id});
        if (result) {
            return result.user_role;
        } else {
            throw Error("Cannont find user in the project!");
        }
    } catch (error) {
        console.error(error);
    }
}

const GetProjectUsersPPs = async (aProject_id) => {
    try {
        const queryData = await userFilesDB.find({ project_id: aProject_id });
        if (queryData.length > 0)
            return queryData;
        else
            return null;

    } catch (error) {
        console.error(error);
    }
}

module.exports = { GetUserProjects, GetUserProject, GetProjectsUsers, GetProjectsUser, CreateUserProject, SetProjectName, DeleteProject, GetUserProjectRole, GetProjectUsersPPs, AddUserToProject, RemoveAllUsersFromProject, RemoveUserFromProject, ChangeUsersProjectRole };