const mongoose=require('mongoose')

 const schema_tasks=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user_id required"],
        ref:'Users'
    },
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"project_id required"],
        ref:'Projects'
    },progress:{
        type:Number
    },priority:{
        type:Number
    },
    title:{
        type:String,
        required:[true,"title required"]
    },
    description:{
        type:String,
    }
});
module.exports=mongoose.model("Tasks",schema_tasks);