const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { RegisterUser, LoginUser, LogoutUser, FetchUserByEmail, UploadPP,GetUserProfilePicture } = require("../Controllers/user-controller");

const ppStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("Uploads", "ProfilePictures"));
    },
    filename: (req, file, cb) => {
        const fName = "pp" + "_" + "req.user.id" + "_" + Date.now() + path.extname(file.originalname);
        req.uploadedFName = fName;
        cb(null, fName);
    }
});

const ppUploader = multer({ storage: ppStorage });

router.get("/find", FetchUserByEmail);
router.get("/profile-picutre", GetUserProfilePicture);

router.post("/register", ppUploader.single("image"), RegisterUser, UploadPP);
router.post("/login", LoginUser);
router.delete("/logout", LogoutUser);


module.exports = router;