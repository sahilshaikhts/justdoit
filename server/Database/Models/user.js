const mongoose=require('mongoose')

 const schema_user=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username required"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email required"]
    },
    hashed_password:{
        type:String,
        required:[true,"Password required"]
    }
});
module.exports=mongoose.model("Users",schema_user);