import React, { useState } from "react";
import { RegisterUser } from "../../../scripts/API/regiester-user";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../../Context/AuthorizationContext";

export default function RegisterForm() {
    const [userPicture, setUserPicture] = useState(null);
    const [bFailedRegistration, setFailedRegistration] = useState(false);
    const { bLoggedIn, LoginUser } = useAuthContext();

    async function OnRegister(event) {
        event.preventDefault()
        const form = new FormData(event.target);
        //Add a saftey check for userPicture, check if what's stored is an image.
        const bSuccesful = await RegisterUser(form, userPicture);

        if (bSuccesful)
            await LoginUser(form.get("email"), form.get("password"));
        else
            setFailedRegistration(true)
    }
  

    return <section className='login-register'>
        {bLoggedIn && <Navigate to="/user/projects"></Navigate>}
        <div className="Form-section">
            <form onSubmit={OnRegister} encType="multipartmultipart/form-data">
                <h1>Welcome to just do it!</h1>
                <p>Create an account. Already have one? </p>
                <a href="/login" style={{ marginBottom: "20px", fontSize: "12px" }}>login here</a>
                <input name="image" type="file" accept="image" onChange={setUserPicture(e.target.files[0])}></input>
                <input name="username" placeholder="Username"></input>
                <input name="email" placeholder="Email"></input>
                <input name="password" placeholder="Password" type="password"></input>
                <button type="submit">Register</button>
                {bFailedRegistration && <a style={{ color: "red", marginLeft: "10px", fontFamily: "arial", fontSize: "13px" }}>Error registering ,email may already be in use.</a>}
            </form>
        </div>
    </section>
}