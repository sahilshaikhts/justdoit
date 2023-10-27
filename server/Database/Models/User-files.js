const mongoose=require('mongoose')

 const schema_userFiles=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user_id required"],
        ref:'Users'
    },
    fileName:{
        type:String,
        required:[true,"Name required"]
    },
    fileType:{
        type:String,
        required:[true,"Type required"]
    }
});
module.exports=mongoose.model("User-files",schema_userFiles);