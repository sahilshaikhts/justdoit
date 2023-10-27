const { FindUserByEmail, CreateUser, UploadUsersPP, GetUserBasicInfo, GetUserPPFileName } = require("../Database/TableQueries/user-queries");
const TryCatch = require("../Utils/try-catch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs")
const GenerateJWT = require("./jwt-generator");
const path = require("path");

const RegisterUser = TryCatch(async (req, res, next) => {
    const { username, email, password } = req.body;
    const emailToCheck=email.toLowerCase();
    //Check if user provided all data.
    if (!username || !email || !password) {
        throw new Error("All fields are mandatory!");
        res.status(400).json({ message: "Missing fields!" });

    }

    //Check if user already exists
    const bUserExists = await FindUserByEmail(emailToCheck)
    if (bUserExists) {
        res.status(409).json({ message: "User with this email already exists" });
        throw new Error("User with this email already exists!");
    } else {
        const hashed_password = await bcrypt.hash(password, 12);
        const userCreated = await CreateUser(username, emailToCheck, hashed_password);
        
        //check if createuser was succesfull or not.
        if (userCreated) {
            const currentUser = {
                user: {
                    "username": username,
                    "email": emailToCheck,
                    "id": userCreated.id
                }
            }
            req.user = currentUser.user;
            const bGenerated = await SetupTokens(currentUser, res);

            if (bGenerated == false) {
                throw new Error("Failed generating tokens!")
            } else
                res.set("bToken", "true");
            res.status(200).json({ message: "User registered" });
            next();

        }
    }
});

const LoginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const emailToCheck=email.toLowerCase();

    const req_user = await FindUserByEmail(emailToCheck);
    //Check if user with given email exists.
    if (req_user) {
        //Check user's password with saved encrypted paswword.
        if (await bcrypt.compare(password, req_user.hashed_password)) {

            const bGenerated = await SetupTokens(
                {
                    user: {
                        "username": req_user.username,
                        "email": emailToCheck,
                        "id": req_user.id
                    }
                }
                , res);

            if (bGenerated == false) {
                res.status(400).json({ Error: "Failed generating tokens!" });
                throw new Error("Failed generating tokens!")
            } else
                res.status(200).json({ message: req_user.username + " logged in successfully" });
            return;
        }
    }

    //If can't find email or can't verify password,respond with error message.
    res.status(400).json({ message_reg: "Email or password incorrect!" });
    throw new Error("Email or password incorrect!");
}
);

const LogoutUser = TryCatch(async (req, res) => {

    res.cookie("token_refresh", '', { maxAge: 0 });
    res.cookie("token_access", '', { maxAge: 0 });

    res.status(200).json({ message: "User logged out.Tokens deleted." });
}
);
const FetchUserByEmail = TryCatch(async (req, res) => {
    const email = req.query.email.toLowerCase();
    if (email) {
        const user = await GetUserBasicInfo(email)

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Missing email!" })
        }
    } else {
        res.status(400).json({ message: "Missing email!" })
        throw new Error("Missing email!");
    }
}
);

const UploadPP = TryCatch(async (req, res) => {
    const userId = req.user.id;
    const fileName = req.uploadedFName;

    if (!userId || !fileName) {
        console.error("Missing id or file name");
    } else {
        if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg') {
            const bResult = UploadUsersPP(userId, fileName, req.file.mimetype);
        } else {
            console.error("User profile picture is of the wrong type!")
        }
        return;
    }
});
const GetUserProfilePicture = TryCatch(async (req, res) => {
    const user_id = req.query.user_id;
    
    if (user_id !== null) {
        const fileData = await GetUserPPFileName(user_id);
        if (fileData) {
            //Set header type after checking for supported types.
            if (fileData.fileType === 'image/png')
                res.setHeader('content-type', 'image/png')
            else
                if (fileData.fileType === 'image/jpg')
                    res.setHeader('content-type', 'image/jpg')
                else if (fileData.fileType === 'image/jpeg')
                    res.setHeader('content-type', 'image/jpeg')
                else {//Throw error if the uploded file is not of the supported type.
                    res.status(500).json({ error: "Error fetching user image. Uploaded file is either wrong type or corrupted!" });
                    throw new Error("Error fetching user image. Uploaded file is either wrong type or corrupted!");
                }
            const filePath = path.join('Uploads', 'ProfilePictures', fileData.fileName);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.status(500).json({ error: "Server error:Cant load file on server." })
                    throw new Error("Server error:Cant load file on server")
                } else {
                    if (data) {
                        res.status(200).send(data);
                    }
                }
            });
        } else {
            res.status(202).json({ mesage: "User doesnt have a profile picture." })
        }
    }
    else {
        res.status(400).json({ error: "Missing user_id in query!" })
    }

});

//Generates and stores tokens in cookies(Http only)
async function SetupTokens(tokenObject, res) {
    const refreshToken = await GenerateJWT(tokenObject, process.env.SECRET_REFRESH_KEY, process.env.AGE_REFRESHTOKEN);
    const accessToken = await GenerateJWT(tokenObject, process.env.SECRET_ACCESS_KEY, process.env.AGE_ACCESSTOKEN);

    if (refreshToken && accessToken) {
        res.cookie("token_refresh", refreshToken, { httpOnly: false, maxAge: 3 * 24 * 60 * 60000, sameSite: "none" });//Age: 3 days
        res.cookie("token_access", accessToken, JSON.parse(process.env.CONFIG_COKI_ACCESSTOKEN));//Age: 10 min
        return true;
    } else {
        return false;
    }
}


module.exports = { RegisterUser, LoginUser, LogoutUser, FetchUserByEmail, UploadPP, GetUserProfilePicture };