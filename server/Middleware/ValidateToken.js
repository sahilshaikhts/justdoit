const jwt = require("jsonwebtoken");
const TryCatch = require("../Utils/try-catch");

const VerifyAccessToken = TryCatch((req, res, next) => {
    const token = req.cookies.token_access;
    console.log("Verifying access token");
    if (token) {
        jwt.verify(token, process.env.SECRET_ACCESS_KEY,
            (error, decoded) => {
                if (error) {
                    res.status(403).json({ error: "User not permitted" });
                    console.error("Access token invalid!")
                } else {
                    req.user = decoded.user;

                    console.log("Authorized: " + decoded.user.username);
                    next();
                }
            });
    } else {
        res.status(403).json({ error: "User not permitted" });
        console.error("Access token invalid!");
    }
});

const VerifyRefreshToken = TryCatch((req, res, next) => {
    const token = req.cookies.token_refresh;
    if (token) {    
        jwt.verify(token, process.env.SECRET_REFRESH_KEY,
            (error, decoded) => {
                if (!error) {
                    console.log("verrifed: ", decoded.user.username);
                    req.user = decoded.user;
                }
            });
    }
    next();
});

module.exports = { VerifyAccessToken, VerifyRefreshToken };