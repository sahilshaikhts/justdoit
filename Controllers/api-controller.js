const TryCatch = require("../Utils/try-catch");
const GenerateJWT = require("./jwt-generator");

const GetAccessToken = TryCatch(async (req, res, next) => {
    const { id, username, email } = req.user;
    if (id && username && email) {
        const accessToken = await GenerateJWT({ user: { 'id': id, 'username': username, 'email': email } }, process.env.SECRET_ACCESS_KEY, process.env.AGE_ACCESSTOKEN);
        if (accessToken) {
            console.log("success!"+accessToken);
            res.cookie("token_access", accessToken, JSON.parse(process.env.CONFIG_COKI_ACCESSTOKEN)).status(200);//Age: 10 min
            res.send();
        }
    } else {
        res.status(401).json({ message: "Error generating acess token!" })
        throw new Error("Error generating acess token!")
    }
});

module.exports = { GetAccessToken }