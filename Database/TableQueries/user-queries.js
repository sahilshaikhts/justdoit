const database = require("../connect-db");

const FindUserByEmail = async (email) => {
    try {
        const [rows] = await database.query('select * from jdi.users where email=?', email);
        if (!rows || rows.length == 0) {
            return null;
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
            const [result] = await database.query(
                'insert into jdi.users (username,email,hashed_password) values(?,?,?)',
                [username, email, hashedPassowrd]);

            if (result.affectedRows === 1)
                return result;
            else
                return null;
        }
    } catch (error) {
        console.log(error);
    }
};

const UploadUsersPP = async (aUserID, aFileName) => {
    try {
        const [queryData] = await database.query("insert into jdi.user_files(userID,fileName,fileType)values(?,?,?)", [aUserID, aFileName, "Image"])
        if (queryData.affectedRows === 1)
            return queryData;
        else
            return null;

    } catch (error) {
        console.log(error);
    }
}


module.exports = { FindUserByEmail, CreateUser, UploadUsersPP };