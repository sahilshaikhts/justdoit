const mongoDB = require("mongoose")

const ConnectDB = async () => {
    try {
        const connect = await mongoDB.connect(process.env.DB_CONNECTION_STRING);
        console.log("DB connected: " + connect.connection.host + connect.connection.name)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports=ConnectDB;