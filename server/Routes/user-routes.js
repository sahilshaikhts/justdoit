const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { RegisterUser, LoginUser, LogoutUser, FetchUserByEmail, UploadPP, GetUserProfilePicture } = require("../Controllers/user-controller");

const ppStorage = multer.memoryStorage()

const ppUploader = multer({ storage: ppStorage });

router.get("/find", FetchUserByEmail);
router.get("/profile-picutre", GetUserProfilePicture);

router.post("/register", ppUploader.single("image"), RegisterUser, UploadPP);
router.post("/login", LoginUser);
router.delete("/logout", LogoutUser);


module.exports = router;