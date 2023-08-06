export async function RegisterUser(name, email, password) {
    const registerUser = "http://localhost:8383/user/register";
    const data = { 'username': name, 'email': email, 'password': password }
    console.log(name);
    try {
        const response = await fetch(registerUser,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        if (response && response.ok) {
            const rcvData = await response.json();
            console.log("yes@")
        }
    } catch (error) {
        console.error(error);
    }

}