export async function FetchAccessToken() {
    const url = "http://localhost:8383/api/get-accessToken"
    try {
        console.log("fetch..");
        
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        console.log("fetched");
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}