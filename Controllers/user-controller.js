const { FindUserByEmail, CreateUser } = require("../Database/user-queries");
const TryCatch = require("../Utils/try-catch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = TryCatch(async (req, res) => {
    const { username, email, password } = req.body;

    //Check if user provided all data.
    if (!username || !email || !password) {
        throw new Error("All fields are mandatory!");
    }

    //Check if user already exists
    if (await FindUserByEmail(email)) {
        throw new Error("User with this email already exists!");
        res.status(409);
    } else {
        const hashed_password = await bcrypt.hash(password, 12);
        const queryData = await CreateUser(username, email, hashed_password);

        //check if createuser was succesfull or not.
        if (queryData) {
            res.status(201).json({ message: 'User registered succesfully.' });
        } else {
            res.status(400);
            throw new Error("Couldn't create new user!");
        }
    }
});

const LoginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await FindUserByEmail(email);

    //Check if user with given email exists.
    if (!user) {
        throw new Error("Email or password incorrect!");
    } else {
        //Check user's password with saved encrypted paswword.
        if (await bcrypt.compare(password, user.hashed_password)) {
            const pay_load = {
                "id":user.id,
                "username": user.username,
                "email": email,
            };

            const token = await jwt.sign(pay_load, process.env.SECRET_JKEY, { expiresIn: "1h" });

            res.status(200).json({ message: user.username + " logged in successfully", Token: token });
        }
    }
});

module.exports = { RegisterUser, LoginUser };