export async function FetchAccessToken() {
    const url = "http://localhost:8383/api/get-accessToken"
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}