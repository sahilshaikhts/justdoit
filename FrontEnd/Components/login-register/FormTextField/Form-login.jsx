import React, { useEffect, useState } from "react";
import FormTextField from "./Form-textField";
import { Login } from "../../../scripts/API/user-sessionHandler";
import { Navigate } from "react-router-dom";

export default function LoginForm(props) {
    //TODOL: implement handling invalid email and passowrd
    const [err_login, Set_err_login] = useState(false);
    const [token, setToken] = useState(false);

    async function OnLogin(event) {
        event.preventDefault()

        const emailId = document.getElementById("field_email").value;
        const password = document.getElementById("field_password").value;
        const bResponded = await Login(emailId, password);

        if (bResponded) {
            Set_err_login(false);
            setToken(true);
            console.log("loggedin", token)
        } else {
            Set_err_login(true);
        }
    }

    useEffect((event) => {
        if (token) {
            props.OnLogin();
            console.log("Token updated:", token);
        }
    }, [token]);

    return <section className='login-register'>
        {token && <Navigate to={"/user/projects"}></Navigate>}
        <div className="Form-section">
            <form>
                <h1>Welcome back!</h1>
                <p>Login to continue. Don't have an account? </p>
                <a href="/" style={{ marginBottom: "20px", fontSize: "12px" }}>Register here</a>
                <FormTextField id="field_email" default_text="Email"></FormTextField>
                <FormTextField id="field_password" default_text="Password" type="password"></FormTextField>
                <button onClick={OnLogin}>Login</button>
                {err_login && <a style={{ marginBottom: "20px", fontSize: "12px", color: "red" }}>Wrong email or passowrd,try again!</a>}
            </form>
        </div>
    </section>
}