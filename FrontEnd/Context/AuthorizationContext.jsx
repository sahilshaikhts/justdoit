import { createContext, useContext, useState } from "react";
import React from "react";
import { Login } from "../scripts/API/user-sessionHandler";
import { FetchAccessToken } from "../scripts/API/fetch-acessToken";

const AuthorizationContext = createContext();

function UserAuthProvider({ children }) {
    const [bLoggedIn, setLoggedIn] = useState(false);

    async function LoginUser(email, password) {
        let bLoginSuccess = false;
        //Check if successfull and make sure state is set with appropriate type.
        if (await Login(email, password) === true)
            bLoginSuccess = true;

        setLoggedIn(bLoginSuccess);

        return bLoginSuccess;
    }

    async function LoginWithToken() {
        const bSuccess = await FetchAccessToken();
        if (bSuccess) {
            setLoggedIn(true);
        } else
            setLoggedIn(false);
    }

    function LogoutUser() {
        console.log("logging uut..")
    }

    return (
        <AuthorizationContext.Provider value={{ bLoggedIn, LoginUser, LogoutUser,LoginWithToken }}>
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
