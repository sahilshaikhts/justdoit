import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
    return <>
            <footer className="nav_links">
                <ul className="nav_link_list">
                    {<li><Link to={'/user/projects'}>FAQ</Link></li>}
                    {<li><a>Contact us</a></li>}
                </ul>
            </footer>
    </>
}