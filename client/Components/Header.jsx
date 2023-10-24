import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthorizationContext";
import UnfocusHandler from "./Utility/UnFocusElementHandler";

export default function Header() {
    const { bLoggedIn, LogoutUser } = useAuthContext();
    const navigate =useNavigate()
    function UnFocusElement(event) {
        const element = document.getElementsByClassName('nav_link_list')[0];
        if (element.classList.contains("active"))
            element.classList.remove("active")
    }

    return <>
        <nav>
            <div className="header_logo" onClick={()=>{navigate('/')}}>
                <img role="button" src="/client\Images\WebsiteLogo_taskSite.jpg"
                    alt="Just do it! {ಠʖಠ}" /></div>

            <UnfocusHandler cName="nav_links" OnClickAway={UnFocusElement}>
            {bLoggedIn && <a onClick={() => { const navbarLinks = document.getElementsByClassName('nav_link_list')[0]; navbarLinks.classList.toggle("active"); }} className="button_navMenu" ><img src="/client\Images\icon_menu.svg" /></a>}
                <ul className="nav_link_list" >
                    {bLoggedIn && <li><Link to={'/user/projects'}>Projects</Link></li>}
                    {bLoggedIn && <li><a onClick={() => { LogoutUser(); navigate("/") }}>Logout</a></li>}
                </ul>
            </UnfocusHandler>
        </nav>
    </>
}