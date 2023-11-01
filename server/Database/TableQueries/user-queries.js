const User = require('../Models/user.js');
const UserFile = require('../Models/User-files.js');

const FindUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (user)
            return { id: user._id, username: user.username, email: user.email, hashed_password: user.hashed_password };
        else
            return null
    } catch (error) {
        console.error(error);
    }
};

const GetUserBasicInfo = async (email) => {
    try {
        const user = await User.findOne({ email }).select('username email');
        if (user)
            return { id: user._id, username: user.username, email: user.email };
        else
            return null
    } catch (error) {
        console.error(error);
    }
};

const CreateUser = async (username, email, hashedPassowrd) => {
    try {
        const user = new User({ username, email, hashed_password: hashedPassowrd });
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
    }
};

const UploadUsersPP = async (aUserID, aFileName, aFileType) => {
    try {
        const userFile = new UserFile({user_id:aUserID,fileName: aFileName, fileType:aFileType });
        await userFile.save();
        return userFile;
    } catch (error) {
        console.error(error);
    }
}
const GetUserPPFileName= async (aUserID) => {
    try {
        const userFile = await UserFile.findOne({ user_id: aUserID }).select('fileName fileType');
        return userFile;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { FindUserByEmail, CreateUser, UploadUsersPP, GetUserBasicInfo, GetUserPPFileName };