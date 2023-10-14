import React, { useState } from "react";
import { Login } from "../../scripts/API/user-sessionHandler.js";
import { RegisterUser } from "../../scripts/API/user-data-api.js";

export default function RegisterForm() {
    const [userPicture, setUserPicture] = useState(null);
    const [bFailedRegistration, setFailedRegistration] = useState(false);

    async function OnRegister(event) {
        event.preventDefault()
        const form = new FormData(event.target);
        //Add a saftey check for userPicture, check if what's stored is an image.
        const bSuccesful = await RegisterUser(form, userPicture);

        if (bSuccesful) 
            await Login(form.get("email"), form.get("password"));
        else
            setFailedRegistration(true)
    }

    return <>
        <form  className="Form-section"  onSubmit={OnRegister} encType="multipartmultipart/form-data">
            <input name="image" type="file" accept="image/jpeg, image/png"  onChange={(e) => setUserPicture(e.target.files[0])}></input>
            <input name="username" placeholder="Username"></input>
            <input name="email" placeholder="Email"></input>
            <input name="password" placeholder="Password" type="password"></input>
            <button type="submit">Register</button>
            {bFailedRegistration && <a style={{ color: "red", marginLeft: "10px", fontFamily: "arial", fontSize: "13px" }}>Error registering ,email may already be in use.</a>}
        </form>
    </>
}