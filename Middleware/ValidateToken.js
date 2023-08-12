const jwt = require("jsonwebtoken");
const TryCatch = require("../Utils/try-catch");

const VerifyAccessToken = TryCatch((req, res, next) => {
    const token = req.cookies.token_access;
    console.log("Verifying access token");
    if (token) {
        jwt.verify(token, process.env.SECRET_ACCESS_KEY,
            (error, decoded) => {
                if (error) {
                    res.status(401);
                    throw new Error("Access token invalid!")
                }
                req.user = decoded.user;

                console.log("Authorized: " + decoded.user.username);
                next();
            });
    } else {
        res.status(401);
        throw new Error("Access token invalid!");
    }
});

const VerifyRefreshToken = TryCatch((req, res, next) => {
    const token = req.cookies.token_refresh;
    console.log("verrifying ref_token");
    
    if (token) {
        jwt.verify(token, process.env.SECRET_REFRESH_KEY,
            (error, decoded) => {
                if (error) {
                    res.status(401).json({message:"Refresh token expired or doesn't exists!"})
                    throw new Error("Refresh token not valid!");
                }
                console.log("verrifed: ", decoded.user.username);
                req.user = decoded.user;
                next();
            });
    } else {
        res.status(401).json({message:"Refresh token doesn't exists!"})
        throw new Error("Refresh token doesn't exists!");
    }
});

module.exports = { VerifyAccessToken, VerifyRefreshToken };