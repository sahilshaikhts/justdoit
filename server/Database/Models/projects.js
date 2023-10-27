const mongoose=require('mongoose')

 const schema_projects=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Project name required"]
    }
});
module.exports=mongoose.model("Projects",schema_projects);