export async function RegisterUser(formData) {
    const registerUser = "http://localhost:8383/user/register";

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
    const url = `http://localhost:8383/user/find?email=${encodeURIComponent(aEmail)}`;
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
    const url = `http://localhost:8383/user/project/change-role?project_id=${encodeURIComponent(project_id)}`;
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
    const url = `http://localhost:8383/user/profile-picutre?user_id=${encodeURIComponent(user_id)}`;
    try {

        const response = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
            const imageBlob = await response.blob()
            if (imageBlob)
                return URL.createObjectURL(imageBlob);
        }
    } catch (error) {
        console.error(error);
    }
}