import React, { useState } from "react";
import { useAuthContext } from "../../Context/AuthorizationContext";

import RegisterForm from "../login-register/Form-register";
import LoginForm from "../login-register/Form-login";

//Display either login or register form based on bDisplayRegsiterForm
//Register Form
export default function FormloginRegister() {
    const [bDisplayRegsiterForm, setbDisplayRegsiterForm] = useState(true)
    const { bLoggedIn } = useAuthContext();


    return <div className='login-register'>
        {
            bLoggedIn
            && <h1>Welcome to just do it!</h1>
            || (bDisplayRegsiterForm ?
                <>
                    <h1>Welcome to just do it!</h1>
                    <p>Create an account. Already have one? </p>
                    <a onClick={() => setbDisplayRegsiterForm(false)}>login here</a>
                    <RegisterForm />
                </>
                :
                <>
                    <h1>Welcome back!</h1>
                    <p>Login to continue. Don't have an account? </p>
                    <a onClick={() => setbDisplayRegsiterForm(true)}>Register here</a>
                    <LoginForm />
                </>
            )}
    </div>
}