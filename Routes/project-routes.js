const express=require("express");
const TryCatch = require("../Utils/try-catch");
const router=express.Router();

router.route("/").get(TryCatch((req,res)=>
{
    console.log("projects");
    res.status(200).json({message:"This are your projects."})
}));

router.route("/:project_id").get((req,res)=>
{
    res.status(200).json({message:"This are your projects."})
});

module.exports=router;