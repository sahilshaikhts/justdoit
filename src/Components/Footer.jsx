import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
    return <>
        <footer className="nav_links">
            <ul className="nav_link_list">
                {<li><a href="https://www.shaikhofallcode.com">Developer site.(Sahil)</a></li>}
                {<li><a href="mailto:sahilshaikhts@gmail.com">Contact me</a></li>}
            </ul>
        </footer>
    </>
}