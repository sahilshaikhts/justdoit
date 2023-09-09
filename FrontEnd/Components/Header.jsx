import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthorizationContext";

export default function Header() {
    const { bLoggedIn, LogoutUser } = useAuthContext();

    console.log(bLoggedIn)
    return <>
        <header>
            <nav>
                <div className="header_logo" to='/'>
                    <img role="button" src="../FrontEnd\Images\WebsiteLogo_taskSite.jpg"
                        alt="Just do it! {ಠʖಠ}" /></div>
                <ul className="header_links">
                    {bLoggedIn && <li><Link to={'/user/projects'}>Projects</Link></li>}
                    {bLoggedIn && <li><a onClick={LogoutUser}>Logout</a></li>}
                </ul>
            </nav>
        </header>
    </>
}