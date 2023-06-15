const jwt = require("jsonwebtoken");
const TryCatch = require("../Utils/try-catch");

const VerifyToken = TryCatch((req, res, next) => {
    const req_token = req.headers.Authorization || req.headers.authorization;
    console.log("verrifying "+req_token);
    if (req_token && req_token.startsWith("Bearer")) {
        const token = req_token.split(' ')[1];

        jwt.verify(token, process.env.SECRET_JKEY,
            (error, decoded) => {
                if (error) {
                    res.status(401);
                    throw new Error("Access token invalid!")
                }
                req.userid=decoded.id;
                console.log("Authorized\n" + req.userid);
                next();
            });
    } else {
        res.status(401);
        throw new Error("Access token invalid!");
    }
});

module.exports = VerifyToken;