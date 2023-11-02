import { createContext, useContext, useState } from "react";
import React from "react";
import { Login, Logout, FetchAccessToken } from "../scripts/API/user-sessionHandler";
import { FetchUserWithEmail, GetUserProfilePicture } from "../scripts/API/user-data-api";
import { Navigate, useNavigate } from "react-router-dom";

const AuthorizationContext = createContext();

function UserAuthProvider({ children }) {
    const [bLoggedIn, setLoggedIn] = useState(false);
    const [currentUser, SetCurrentUser] = useState();//{id,username,email,url_image}

    async function LoginUser(email, password) {
        //Check if successfull and make sure state is set with appropriate type.
        if (await Login(email, password) === true) {
            const user = await FetchUserWithEmail(email);
            await SetCurrentUserDetails(user);
            setLoggedIn(true);
            return true;
        } else {
            setLoggedIn(false);
            return false;

        }
    }

    async function LoginWithToken() {

        const response = await FetchAccessToken();

        if (response) {
            const user = await FetchUserWithEmail(response.email);
            await SetCurrentUserDetails(user);
            setLoggedIn(true);
            return true;
        } else {
            setLoggedIn(false);
            return false;
        }
    }
    async function LogoutUser() {
        const bLoggedOut = await Logout();
        if (bLoggedOut) {
            setLoggedIn(false);
        } else
            setLoggedIn(true);
    }


    async function SetCurrentUserDetails(user) {
        if (user) {
            //Setup currentUser state
            const imageUrl = await GetUserProfilePicture(user.id);
            //Fetch user's image or set default.
            if (imageUrl) {
                SetCurrentUser({ ...user, url_image: imageUrl });
            } else
                SetCurrentUser({ ...user, url_image: "/src/Images/temp_preview_memberPP.webp" });
        }
    }

    return (
        <AuthorizationContext.Provider value={{ bLoggedIn, currentUser, LoginUser, LogoutUser, LoginWithToken }}>
            {children}
        </AuthorizationContext.Provider>
    );

}
function useAuthContext() {
    const context = useContext(AuthorizationContext);
    if (context === undefined) {
        throw new Error('"useAuthContext" must be used within Cntx_UserAuthHandler(provider)!')
    } else
        return context;
}


export { useAuthContext, UserAuthProvider };
