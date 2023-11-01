import React, { useEffect, useState } from "react";
import FormTextField from "./FormTextField/Form-textField";
import { useAuthContext } from "../../Context/AuthorizationContext";

export default function LoginForm(props) {
    //TODOL: implement handling invalid email and passowrd
    const [err_login, Set_err_login] = useState(false);
    const {LoginUser}=useAuthContext();

    async function OnLogin(event) {
        event.preventDefault()

        const emailId = document.getElementById("field_email").value;
        const password = document.getElementById("field_password").value;
        const bResponded = await LoginUser(emailId, password);

        if (bResponded) {
            Set_err_login(false);
        } else {
            Set_err_login(true);
        }
    }

    return <>
            <form className="Form-section">
                <FormTextField id="field_email" default_text="Email"></FormTextField>
                <FormTextField id="field_password" default_text="Password" type="password"></FormTextField>
                <button onClick={OnLogin}>Login</button>
                {err_login && <a style={{ marginBottom: "20px", fontSize: "12px", color: "red" }}>Wrong email or passowrd,try again!</a>}
            </form>
    </>
}