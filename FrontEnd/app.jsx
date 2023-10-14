import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Header from './Components/Header';
import Home from "./Components/Home-page/Home";
import ProjectPage from './Components/Project-page/project-page';

import PrivateRoute from "./Components/Utility/PrivateRoute";

import { useAuthContext } from "./Context/AuthorizationContext";
import Footer from "./Components/Footer";
import TaskPage from "./Components/Task-page/Task-page";

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
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/user/projects' element={
                        <PrivateRoute bCondition={bLoggedIn} fallbackRoute="/">
                            <ProjectPage />
                        </PrivateRoute>
                    } />
                    <Route path='/user/project/:projectId/task' element={
                        <TaskPage />
                    } />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}