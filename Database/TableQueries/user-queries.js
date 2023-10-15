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
        console.error(error);
    }
};

const GetUserBasicInfo = async (email) => {
    try {
        const [rows] = await database.query('select jdi.users.id,jdi.users.username,jdi.users.email from jdi.users where email=?', email);
        if (!rows || rows.length == 0) {
            return null;
        } else {
            return rows[0];
        }
    } catch (error) {
        console.error(error);
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
        console.error(error);
    }
};

const UploadUsersPP = async (aUserID, aFileName,aFileType) => {
    try {
        const [queryData] = await database.query("insert into jdi.user_files(userID,fileName,fileType)values(?,?,?)", [aUserID, aFileName, aFileType])
        if (queryData.affectedRows === 1)
            return queryData;
        else
            return null;

    } catch (error) {
        console.error(error);
    }
}
const GetUserPPFileName = async (aUserID) => {
    try {
        const [queryData] = await database.query("select jdi.user_files.fileName,jdi.user_files.fileType from  jdi.user_files where jdi.user_files.userID=?", [aUserID])
        console.log(queryData)
        if (queryData && queryData.length>0)
            return queryData[0];
        else
            return null;

    } catch (error) {
        console.error(error);
    }
}

module.exports = { FindUserByEmail, CreateUser, UploadUsersPP,GetUserBasicInfo,GetUserPPFileName };