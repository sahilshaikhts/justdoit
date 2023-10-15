const TryCatch = require("../Utils/try-catch");
const GenerateJWT = require("./jwt-generator");
const { FindUserByEmail } = require("../Database/TableQueries/user-queries");

const GetAccessToken = TryCatch(async (req, res, next) => {
    const { id, username, email } = req.user;
    if (id && username && email) {
        const bUserExists = await FindUserByEmail(email);
        if (bUserExists) {
            const accessToken = await GenerateJWT({ user: { 'id': id, 'username': username, 'email': email } }, process.env.SECRET_ACCESS_KEY, process.env.AGE_ACCESSTOKEN);
            if (accessToken) {
                res.cookie("token_access", accessToken, JSON.parse(process.env.CONFIG_COKI_ACCESSTOKEN)).status(200).json({email:email});//Age: 10 min
            }
        } else {
            //Safety check: If user has refresh key despite deleted account ,delete the cookies.
            res.cookie("token_refresh", '', { maxAge: 0 });
            res.cookie("token_access", '', { maxAge: 0 });
            res.status(400).json({ message: "User doesn't exists!" })
        }
    } else {
        res.status(401).json({ message: "Error generating acess token!" })
        throw new Error("Error generating acess token!")
    }
});

module.exports = { GetAccessToken }