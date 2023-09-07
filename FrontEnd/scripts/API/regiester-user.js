export async function RegisterUser(formData) {
    const registerUser = "http://localhost:8383/user/register";

    try {
        const response = await fetch(registerUser,
            {
                method: 'POST',
                body:formData
            }
        );
        if (response && response.ok) {
            return true;
        }else
        return false;

    } catch (error) {
        console.error(error);
    }

}