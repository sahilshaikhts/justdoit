import React from "react";
import { Link, Navigate } from "react-router-dom";
export default function Footer() {
    return <>
            <footer>
                <ul className="col-100 nav_links">
                    {<li><Link to={'/user/projects'}>FAQ</Link></li>}
                    {<li><a>Contact us</a></li>}
                </ul>
            </footer>
    </>
}