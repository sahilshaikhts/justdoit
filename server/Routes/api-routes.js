const express=require("express");
const router=express.Router();
const {GetAccessToken} = require("../Controllers/api-controller");
const {VerifyRefreshToken} = require("../Middleware/ValidateToken");

router.route("/get-accessToken").get( VerifyRefreshToken, GetAccessToken);

module.exports = router;