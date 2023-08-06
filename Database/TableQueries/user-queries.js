const database = require("../connect-db");

const FindUserByEmail = async (email) => {
    try {
        const [rows] = await database.query('select * from jdi.users where email=?', email);
        if (!rows || rows.length == 0) {
            throw new Error("Record with given email not found");
        } else {
            return rows;
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
            const queryData = await database.query(
                'insert into jdi.users (username,email,hashed_password) values(?,?,?)',
                [username, email, hashedPassowrd]);

                console.log(queryData);
            return queryData;
        }
    } catch (error) {
        console.log(error);
    }
};


module.exports = { FindUserByEmail, CreateUser };