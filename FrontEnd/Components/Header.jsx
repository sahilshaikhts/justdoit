import React, { useContext, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { useAuthContext } from "../Context/AuthorizationContext";

export default function Header() {
    const { bLoggedIn, LogoutUser } = useAuthContext();

    console.log(bLoggedIn)
    return <>
        <nav>
            <div className="header_logo" to='/'>
                <img role="button" src="../FrontEnd\Images\WebsiteLogo_taskSite.jpg"
                    alt="Just do it! {ಠʖಠ}" /></div>

            {bLoggedIn && <a onClick={() => { const navbarLinks = document.getElementsByClassName('nav_links')[0].classList.toggle("active"); }} className="button_navMenu" ><img src="../FrontEnd\Images\icon_menu.svg" /></a>}
            <div className="nav_links">
                <ul>
                    {bLoggedIn && <li><Link to={'/user/projects'}>Projects</Link></li>}
                    {bLoggedIn && <li><a onClick={() => { LogoutUser(); redirect("/") }}>Logout</a></li>}
                </ul>
            </div>
        </nav>
    </>
}