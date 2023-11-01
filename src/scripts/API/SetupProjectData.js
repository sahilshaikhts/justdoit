import { FetchProjectMembers } from "./access-projectsTasks";
import { GetUserProfilePicture } from "./user-data-api";

//Two separate function to fetch and use member's basic data right away and use the other function to load image while rest of the site is still useable.

/**
* Get array of object with member details indexed by user_id with a default profile image(image_url).
* @param {int} project_id - Provide id of the project you wanna get the data of.
* @returns {Array[object]} Returns array(map) of object containing member's data.({username,user_role,image_url=defaultImage})
*/
export async function GetProjectMembersData(project_id) {
    const defaultImageUrl = "/FrontEnd/Images/temp_preview_memberPP.webp";
    const members_array = await FetchProjectMembers(project_id);
    
    let members_map = new Map()
    if (members_array && members_array.length > 0) {
        for (let index = 0; index < members_array.length; index++) {
            const member = members_array[index];
            const userImageURL = await GetUserProfilePicture(member.user_id);
            
            members_map.set(member.user_id, { username: member.username, user_role: member.user_role, image_url: userImageURL?userImageURL:defaultImageUrl });
        }
    }
    return members_map;
}

/**
 * Represents a hoverable function that provides information when hovered.
 * @param {Map} members - Provide Map of members fetched using GetProjectMembersData()
 * @returns {Array[object]} Returns modified array(map) of members with updated imageURL.({user_id,username,user_role,image_url})
 */
export async function GetMembersWProfileImage(members) {
    
    let members_map = new Map();
    if (members) {
        
        members.forEach(async (member, key) => {
            const userImageURL = await GetUserProfilePicture(key);
            if (userImageURL !== null) {
                member.image_url = userImageURL;
                members_map.set(key, member)
            }
        });
    }

    return members_map;
}
