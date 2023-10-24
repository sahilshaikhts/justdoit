import React, { useRef, useState } from "react";
import { Login } from "../../scripts/API/user-sessionHandler.js";
import { RegisterUser } from "../../scripts/API/user-data-api.js";

export default function RegisterForm() {
    const [userPicture, setUserPicture] = useState(null);
    const [bFailedRegistration, setFailedRegistration] = useState(false);
    const fileInputRef = useRef(null);
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
        <form className="Form-section" onSubmit={OnRegister} encType="multipartmultipart/form-data">
            <div className="input_image" onClick={() => { fileInputRef.current.click() }}>
                <img src={userPicture ? URL.createObjectURL(userPicture) : "/client/Images/temp_preview_memberPP.webp"}></img>
                <input ref={fileInputRef} name="image" type="file" accept="image/jpeg, image/png" onChange={(e) => { console.log(e.target.files[0]); setUserPicture(e.target.files[0]) }} />
            </div>
            <input className="field" name="username" placeholder="Username"></input>
            <input className="field" name="email" placeholder="Email"></input>
            <input className="field" name="password" placeholder="Password" type="password"></input>
            <button type="submit">Register</button>
            {bFailedRegistration && <a style={{ color: "red", marginLeft: "10px", fontFamily: "arial", fontSize: "13px" }}>Error registering ,email may already be in use.</a>}
        </form>
    </>
}