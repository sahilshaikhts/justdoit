import { FetchAccessToken } from "./API/user-sessionHandler";

export default function HandleNetworkError(aErrorCode, aNetworkErrorMsg)
{

    switch (aErrorCode) {
        case 400://
            window.alert("Bad request. Refresh and try again or contact developer please.")
            console.error(aErrorCode,": "+aNetworkErrorMsg);
            break;
        case 401:
            console.error(aErrorCode,": "+aNetworkErrorMsg);
            break;
        case 403:
            console.error(aErrorCode,": "+aNetworkErrorMsg);
            window.location.replace('/');
            break;
        case 404:
            console.error(aErrorCode,": "+aNetworkErrorMsg);
            break;
        default:
            break;
    }
}