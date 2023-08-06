const express=require("express");
const { RegisterUser, LoginUser,LogoutUser } = require("../Controllers/user-controller");
const router=express.Router();

router.post("/register",RegisterUser);
router.post("/login",LoginUser);
router.delete("/logout",LogoutUser);

module.exports=router;