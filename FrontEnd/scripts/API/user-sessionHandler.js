export async function Login(email, password) {
    const loginURL = "http://localhost:8383/user/login";
    const data = { 'email': email, 'password': password }
    try {
        const response = await fetch(loginURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return true;
        } else
            return false;

    } catch (error) {
        console.error(error);
    }
}
export async function Logout() {
    const logoutURL = "http://localhost:8383/user/logout";
    try {
        const response = await fetch(logoutURL, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return true;
        } else
            return false;

    } catch (error) {
        console.error(error);
    }
}
export async function FetchAccessToken() {
    const url = "http://localhost:8383/api/get-accessToken"
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
        });
        if (response.ok)
            return await response.json();
        else
            return false;

    } catch (error) {
        console.error(error);
    }
}