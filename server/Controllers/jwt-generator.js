const jwt = require("jsonwebtoken");

/**
 * 
 * @param {Object} aUserData Required properties:id(db_index),username,email
 * @param {string} aSecretKey 
 * @param {string} aDuration 
 */
async function GenerateJWT(aUserData, aSecretKey, aDuration) {
    if (!aUserData || !aSecretKey || !aDuration) {
        console.error("Missing field for generating JWT!",aUserData,aSecretKey,aDuration);
    } else
        if (aUserData.user.id && aUserData.user.username && aUserData.user.email) {
            const token = await jwt.sign(aUserData, aSecretKey, { expiresIn: aDuration });
            return token;
        } else {
            throw Error("Missing properties in userData field!");
        }
}
module.exports = GenerateJWT;