import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import Header from './Components/Header';
import LoginForm from './Components/login-register/FormTextField/Form-login';
import ProjectPage from './Components/Project/project-page';

import Home from "./Components/Home-page/Home";
import PrivateRoute from "./Components/Utility/PrivateRoute";
import { FetchAccessToken } from "./scripts/API/fetch-acessToken";

import AuthorizedContext from "./Context/AuthorizedContext";
import { Logout } from "./scripts/API/user-sessionHandler";

export default function App() {
    const [bUserLoggedIn, SetIsUserLoggedIn] = useState(false);

    useEffect(() => {
        CheckIfUserLoggedIn();
    }, []);//Check when user open the site for the first time.

    async function CheckIfUserLoggedIn() {
        try {
            const response = await FetchAccessToken();
            if (response && response.ok) {
                console.log("logged")
                HandleOnLogin();
            }
        } catch (err) {
            console.log(err);
        }
    }

    function HandleOnLogin() {
        console.log("onlogout")
        SetIsUserLoggedIn(true);
    }
    function HandleOnLogout() {
        const bResponse = Logout();
        if (bResponse) {
            console.log("onlogout");
            SetIsUserLoggedIn(false);
        }
        else
            console.log("error")
    }

    return (
        <>
            <Router>
                <AuthorizedContext.Provider value={bUserLoggedIn}><Header bLoggedIn={bUserLoggedIn} OnLogout={HandleOnLogout} /></AuthorizedContext.Provider>
                <Routes>
                    <Route path='/' element={<AuthorizedContext.Provider value={bUserLoggedIn}><Home /></AuthorizedContext.Provider>} />
                    <Route path='/login' element={<LoginForm bLoggedIn={bUserLoggedIn} OnLogin={HandleOnLogin} />} />
                    <Route path='/user/projects' element={
                        <PrivateRoute bCondition={bUserLoggedIn} fallbackRoute="/login">
                            <ProjectPage />
                        </PrivateRoute>
                    } />

                </Routes>
            </Router>
        </>
    )
}