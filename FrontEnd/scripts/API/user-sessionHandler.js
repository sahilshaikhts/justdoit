export async function Login(email, password) {
    const loginURL = "http://localhost:8383/user/login";
    const data = { 'email': email, 'password': password }
    try {
        const response= await fetch(loginURL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response && response.ok)
        {
            return true;
        }else
        return false;

    } catch (error) {
        console.log(error);
    }
}
export async function Logout() {
    const loginURL = "http://localhost:8383/user/logout";
    try {
        const response= await fetch(loginURL, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response && response.ok)
        {
            return true;
        }else
        return false;

    } catch (error) {
        console.log(error);
    }
}