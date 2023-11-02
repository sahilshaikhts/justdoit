import { base_url } from "../constants";
import defaultImageUrl from '../../Images/default_user_image.png'

export async function RegisterUser(formData) {
    const registerUser = `${base_url}/user/register`;

    try {
        const response = await fetch(registerUser,
            {
                method: 'POST',
                body: formData
            }
        );
        if (response.ok) {
            return true;
        } else
            return false;

    } catch (error) {
        console.error(error);
    }

}
export async function FetchUserWithEmail(aEmail) {
    const url = `${base_url}/user/find?email=${encodeURIComponent(aEmail)}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
            return await response.json();
        }
        else
            return null;
    } catch (error) {
        console.error(error);
    }
}

export async function ChangeUserProjectRole(project_id, user_id, role) {
    const url = `${base_url}/user/project/change-role?project_id=${encodeURIComponent(project_id)}`;
    const data = { user_id: user_id, user_role: role }
    try {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: "include",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return true;
        }
        else
            return null;
    } catch (error) {
        console.error(error);
    }
}
/**
 * 
 * @returns Returns Object url of fetched image or null.
 */
export async function GetUserProfilePicture(user_id) {
    const url = `${base_url}/user/profile-picutre?user_id=${encodeURIComponent(user_id)}`;
    
    try {

        const response = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: { 'content-type': 'application/json' },
        });
        if (response.status===200) {
            const imageBlob = await response.blob()
            if (imageBlob)
                return URL.createObjectURL(imageBlob);
            else
            return defaultImageUrl;
        }else
        return defaultImageUrl;

    } catch (error) {
        console.error(error);
    }
}