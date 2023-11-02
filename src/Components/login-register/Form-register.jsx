import React, { useRef, useState } from "react";
import { Login } from "../../scripts/API/user-sessionHandler.js";
import { RegisterUser } from "../../scripts/API/user-data-api.js";
import default_userImage from '../../Images/default_user_image.png'

export default function RegisterForm() {
    const [userPicture, setUserPicture] = useState(null);
    const [bFailedRegistration, setFailedRegistration] = useState(false);
    const fileInputRef = useRef(null);

    async function OnRegister(event) {
        event.preventDefault()
        const form = new FormData(event.target);
        const email = form.get("email");
        let verifyEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        console.log(verifyEmail.test(email))
        if (verifyEmail.test(email)) {

            //Add a saftey check for userPicture, check if what's stored is an image.
            const bSuccesful = await RegisterUser(form, userPicture);

            if (bSuccesful) {
                const bSuccesful = await Login(form.get("email"), form.get("password"));
                if (bSuccesful) {
                    window.location.replace('/');
                } 
                setFailedRegistration(true)

            } else
                setFailedRegistration(true)
        } else
            setFailedRegistration(true)

    }

    return <>
        <form className="Form-section" onSubmit={OnRegister} encType="multipartmultipart/form-data">
            <div className="input_image" onClick={() => { fileInputRef.current.click() }}>
                <img src={userPicture ? URL.createObjectURL(userPicture) : default_userImage}></img>
                <input ref={fileInputRef} name="image" type="file" accept="image/jpeg, image/png" onChange={(e) => { console.log(e.target.files[0]); setUserPicture(e.target.files[0]) }} />
            </div>
            <input className="field" name="username" placeholder="Username"></input>
            <input className="field" name="email" placeholder="Email"></input>
            <input className="field" name="password" placeholder="Password" type="password"></input>
            <button type="submit">Register</button>
            {bFailedRegistration === true && <a style={{ color: "#e63d23", marginLeft: "10px", fontFamily: "arial", fontSize: "13px" }}>Error registering ,invalid or email may already be in use.</a>}
        </form>
    </>
}