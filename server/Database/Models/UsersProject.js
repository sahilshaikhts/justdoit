const mongoose=require('mongoose')

const schema_usersProjects=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user_id required"],
        ref:'Users'
    },
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"project_id required"],
        ref:'Projects'
    },user_role:{
        type:Number,
        required:[true,"user_role required"],
    }
});
module.exports=mongoose.model("UsersProjects",schema_usersProjects);