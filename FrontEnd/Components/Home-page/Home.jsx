import React, { useContext } from "react";
import RegisterForm from "../login-register/FormTextField/Form-register";
import AuthorizedContext  from "../../Context/AuthorizedContext";

export default function Home() {
    const bUserLoggedIn = useContext(AuthorizedContext);
    console.log(bUserLoggedIn)
    return (
        <>
            {bUserLoggedIn == false && <RegisterForm />}
        </>
    );
}