const express = require("express")
const ValidateToken = require("./Middleware/ValidateToken")
require('dotenv').config();

const app = express();

app.use(express.json());
app.use("/user", require("./Routes/user-routes.js"));

app.use("/user/project", require("./Routes/project-routes.js"));
//app.use(ValidateToken);

app.listen(process.env.PORT, () => {
    console.log("Running on port:" + process.env.PORT);
});
