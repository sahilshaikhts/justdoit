import React, { useContext, useState } from "react";
import RegisterForm from "../login-register/FormTextField/Form-register";
import { useAuthContext } from "../../Context/AuthorizationContext";


export default function Home({ IsLoggedIn, OnLogin }) {
    const { bLoggedIn } = useAuthContext();

    return (
        <div className="container">
            <div className="column col-70">
                <img src="../FrontEnd\Images\temp_homebanner.png" alt="" />
            </div>
            <div className="column col-30">
                {bLoggedIn == false && <RegisterForm />}
            </div>
        </div>
    );
}