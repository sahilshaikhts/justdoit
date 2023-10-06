export async function RegisterUser(formData) {
    const registerUser = "http://localhost:8383/user/register";

    try {
        const response = await fetch(registerUser,
            {
                method: 'POST',
                body:formData
            }
        );
        if (response.ok) {
            return true;
        }else
        return false;

    } catch (error) {
        console.error(error);
    }

}
export async function FetchUserWithEmail(aEmail)
{
    const url = `http://localhost:8383/user/find?email=${encodeURIComponent(aEmail)}`;
    try {
        const response=await fetch(url,{
            method:'GET',
            credentials:"include",
            headers:{'content-type':'application/json'}
        });
        if( response.ok)
        {
            return await response.json();
        }
        else
        return null;
    } catch (error) {
        console.error(error);
    }
}