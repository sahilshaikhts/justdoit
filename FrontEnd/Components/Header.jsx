import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthorizedContext from "../Context/AuthorizedContext.jsx"

export default function Header({ OnLogout }) {
    const bUserLoggedIn = useContext(AuthorizedContext);
    console.log(bUserLoggedIn);
    return <>
        <header>
            <nav>
                <Link className="header_logo" to='/'><img role="button" src="../FrontEnd\Images\WebsiteLogo_taskSite.jpg"
                    alt="Just do it! {ಠʖಠ}" /></Link>
                <div className="header_links">
                    {bUserLoggedIn && <Link to={'/user/projects'}>Projects</Link>}
                    {bUserLoggedIn && <a onClick={OnLogout}>Logout</a>}
                </div>
            </nav>
        </header>
    </>
}