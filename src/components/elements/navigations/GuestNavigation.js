import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "images/logo.svg";
import logoWithFlags from "images/logoWithFlags.png";
import OpenHamburger from "./OpenHamburger";
import CloseHamburger from "./CloseHamburger";
import "./navigation.css";

const GuestNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div>
            <Logo className="logo" />
            <img
              src={logoWithFlags}
              className="logo-with-flags"
              alt="czasnaslowka.pl logo"
            />
          </div>
          <div className={`navbar-inner ${showMenu ? "active" : ""}`}>
            <OpenHamburger openMenu={openMenu} />
            <div className="navbar-inner-box">
              <CloseHamburger closeMenu={closeMenu} />
              <div className="nav">
                <ul>
                  <li>
                    <Link to="/login" className="pure-btn login-btn">
                      Zaloguj
                    </Link>
                  </li>

                  <li>
                    <Link to="/signup" className="pure-btn signup-btn">
                      Zarejestruj
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestNavigation;
