import React, { useState } from "react";
import FormTextField from "./Form-textField";
import { Login } from "../../../scripts/API/user-sessionHandler";
import { RegisterUser } from "../../../scripts/API/regiester-user";

export default function RegisterForm() {
    const [imageSrc, setImageSrc] = useState(null);
    const [bFailedLogin, setFailedLogin] = useState(false);

    async function OnRegister(event) {
        event.preventDefault()

        const name = document.getElementById("field_name").value;
        const email = document.getElementById("field_email").value;
        const password = document.getElementById("field_password").value;

        const bSuccesful = await RegisterUser(name, email, password);

        if (bSuccesful) {
            await Login(email, password);
        } else {
            setFailedLogin(true);
        }
    }
    return <section className='login-register'>

        <div className="Form-section">
            <form>
                <h1>Welcome to just do it!</h1>
                <p>Create an account. Already have one? </p>
                <a href="/login" style={{ marginBottom: "20px", fontSize: "12px" }}>login here</a>
                <FormTextField id="field_name" default_text="Username"></FormTextField>
                <FormTextField id="field_email" default_text="Email"></FormTextField>
                <FormTextField id="field_password" default_text="Password" type="password"></FormTextField>
                <button onClick={OnRegister}>Register</button>
                {bFailedLogin && <a style={{ color: "red", marginLeft: "10px", fontFamily: "arial", fontSize: "13px" }}>Incorrect email or password!</a>}
            </form>
        </div>
    </section>
}