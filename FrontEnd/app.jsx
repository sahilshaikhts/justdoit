import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Header from './Components/Header';
import Home from "./Components/Home-page/Home";
import LoginForm from './Components/login-register/FormTextField/Form-login';
import ProjectPage from './Components/Project/project-page';

import PrivateRoute from "./Components/Utility/PrivateRoute";

import { useAuthContext } from "./Context/AuthorizationContext";

export default function App() {
    const { bLoggedIn, LoginWithToken } = useAuthContext();

    useEffect(() => {
        LoginWithToken();
    }, []);//Check when user open the site for the first time.

    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/user/projects' element={
                        <PrivateRoute bCondition={bLoggedIn} fallbackRoute="/login">
                            <ProjectPage />
                        </PrivateRoute>
                    } />

                </Routes>
            </Router>
        </>
    )
}