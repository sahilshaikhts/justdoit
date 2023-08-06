const { FindUserByEmail, CreateUser } = require("../Database/TableQueries/user-queries");
const TryCatch = require("../Utils/try-catch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GenerateJWT = require("./jwt-generator");

const RegisterUser = TryCatch(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    //Check if user provided all data.
    if (!username || !email || !password) {
        throw new Error("All fields are mandatory!");
    }

    //Check if user already exists
    if (await FindUserByEmail(email)) {
        res.status(409).json({ message: "User with this email already exists" });
        throw new Error("User with this email already exists!");
    } else {
        const hashed_password = await bcrypt.hash(password, 12);
        const queryData = await CreateUser(username, email, hashed_password);

        //check if createuser was succesfull or not.
        if (queryData) {
            const bGenerated = await SetupTokens({
                user: {
                    "username": username,
                    "email": email,
                    "id": queryData[0].id
                }
            }, res);

            res.status(201).json({ message: 'User registered succesfully.' });

            if (bGenerated == false) {
                res.status(400).json({ Error: "Failed generating tokens!" });
                throw new Error("Failed generating tokens!")
            }
        } else {
            res.status(400).json({ message: "Error creating user!" });
            throw new Error("Couldn't create new user!");
        }
    }
});

const LoginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const req_user = await FindUserByEmail(email);
    console.log("s")
    //Check if user with given email exists.
    if (req_user) {
        //Check user's password with saved encrypted paswword.
        if (await bcrypt.compare(password, req_user[0].hashed_password)) {

            const bGenerated = await SetupTokens({
                user: {
                    "username": req_user[0].username,
                    "email": email,
                    "id": req_user[0].id
                }
            }, res);

            if (bGenerated == false) {
                res.status(400).json({ Error: "Failed generating tokens!" });
                throw new Error("Failed generating tokens!")
            } else
                res.status(200).json({ message: req_user[0].username + " logged in successfully" });
            return;
        }
    }

    //If can't find email or can't verify password,respond with error message.
    res.status(400).json({ message: "Email or password incorrect!" });
    throw new Error("Email or password incorrect!");
}
);

const LogoutUser = TryCatch(async (req, res) => {

    res.cookie("token_refresh", '', { maxAge: 0 });
    res.cookie("token_access", '', { maxAge: 0 });

    res.status(200).json({ message: "User logged out.Tokens deleted." });
    throw new Error("Email or password incorrect!");
}
);
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


module.exports = { RegisterUser, LoginUser,LogoutUser };