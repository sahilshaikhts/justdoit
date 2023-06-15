const { TryCatch } = require("../Utils/try-catch");
const db_connection = require("./connect-db");

const FindUserByEmail = async (email) => {
    try {
        const [rows] = await db_connection.query('select * from jdi.users where email=?', [email]);
        if (!rows || rows.length == 0) {
            throw new Error("User with given email not found");
        } else {
            return rows[0];
        }
    } catch (error) {
        console.log(error);
    }
};

const CreateUser = async (username, email, hashedPassowrd) => {
    try {
        if (!username || !email || !hashedPassowrd) {
            throw new Error("Missing fields!")
        } else {
            const queryData = await db_connection.query(
                'insert into jdi.users (username,email,hashed_password) values(?,?,?)',
                [username, email, hashedPassowrd]);
            return queryData;
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = { FindUserByEmail, CreateUser };