const jwt = require("jsonwebtoken");
const TryCatch = require("../Utils/try-catch");

const VerifyAccessToken = TryCatch((req, res, next) => {
    const token = req.cookies.token_access;
    if (token) {
        jwt.verify(token, process.env.SECRET_ACCESS_KEY,
            (error, decoded) => {
                if (error) {
                    res.status(403).json({ error: "User not permitted" });
                    console.error("Access token invalid!")
                } else {
                    req.user = decoded.user;
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
                    req.user = decoded.user;
                }
            });
    }
    next();
});

module.exports = { VerifyAccessToken, VerifyRefreshToken };