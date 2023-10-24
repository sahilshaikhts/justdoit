const express = require("express");
const {VerifyAccessToken,VerifyRefreshToken} = require("./Middleware/ValidateToken");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser({limit:'50mb'}));

app.use("/api",require("./Routes/api-routes.js"));
app.use("/user", require("./Routes/user-routes.js"));

app.use("/user/project/",VerifyAccessToken, require("./Routes/project-routes.js"));

app.listen(process.env.PORT, () => {
    console.log("Running on port:" + process.env.PORT);
});