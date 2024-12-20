import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthorizationContext";
import UnfocusHandler from "./Utility/UnFocusElementHandler";
import siteLogo from "../Images/WebsiteLogo_taskSite.jpg";
import icon_menu from "../Images/icon_menu.svg";

export default function Header() {
  const { bLoggedIn, LogoutUser } = useAuthContext();
  const navigate = useNavigate();
  function UnFocusElement(event) {
    const element = document.getElementsByClassName("nav_link_list")[0];
    if (element.classList.contains("active"))
      element.classList.remove("active");
  }

  return (
    <>
      <header>
        <div
          className="header_logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img role="button" src={siteLogo} alt="Just do it! {ಠʖಠ}" />
        </div>

        <UnfocusHandler cName="nav_links" OnClickAway={UnFocusElement}>
          {bLoggedIn && (
            <a
              onClick={() => {
                const navbarLinks =
                  document.getElementsByClassName("nav_link_list")[0];
                navbarLinks.classList.toggle("active");
              }}
              className="button_navMenu"
            >
              <img src={icon_menu} />
            </a>
          )}
          <ul className="nav_link_list">
            {bLoggedIn && (
              <li>
                <Link to={"/user/projects"}>Projects</Link>
              </li>
            )}
            {bLoggedIn && (
              <li>
                <a
                  onClick={() => {
                    LogoutUser();
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </UnfocusHandler>
      </header>
    </>
  );
}
