import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthorizationContext";

export default function Header() {
    const { bLoggedIn, LogoutUser } = useAuthContext();

    console.log(bLoggedIn)
    return <>
        <header>
            <nav>
                <Link className="header_logo" to='/'><img role="button" src="../FrontEnd\Images\WebsiteLogo_taskSite.jpg"
                    alt="Just do it! {ಠʖಠ}" /></Link>
                <div className="header_links">
                    {bLoggedIn && <Link to={'/user/projects'}>Projects</Link>}
                    {bLoggedIn && <a onClick={LogoutUser}>Logout</a>}
                </div>
            </nav>
        </header>
    </>
}