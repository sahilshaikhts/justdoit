import React, { useContext, useState } from "react";
import RegisterForm from "../login-register/FormTextField/Form-register";


export default function Home({IsLoggedIn,OnLogin}) {
   const [bLoggedIn,setLoggedIn]=useState(false);
  
    return (
        <>
            {bLoggedIn == false && <RegisterForm/>}
        </>
    );
}