import React, { useState } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "images/logo.svg";
import logoWithFlags from "images/logoWithFlags.png";
import OpenHamburger from "./OpenHamburger";
import CloseHamburger from "./CloseHamburger";
import "./navigation.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "actions/auth";

const UserNavigation = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  if (redirectToHome === true) {
    props.logout();
    return <Redirect to="/" />;
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div>
            <Link to="/">
              <Logo className="logo" />
              <img
                src={logoWithFlags}
                className="logo-with-flags"
                alt="czasnaslowka.pl logo"
              />
            </Link>
          </div>
          <div className={`navbar-inner ${showMenu ? "active" : ""}`}>
            <OpenHamburger openMenu={openMenu} />
            <div className="navbar-inner-box">
              <CloseHamburger closeMenu={closeMenu} />
              <div className="nav">
                <ul>
                  <li>
                    <NavLink activeClassName="active" to="/zacznij-nauke">
                      Zacznij naukę
                    </NavLink>
                  </li>

                  <li>
                    <NavLink activeClassName="active" to="/moje-zestawy">
                      Moje zestawy
                    </NavLink>
                  </li>

                  <li>
                    <NavLink activeClassName="active" to="/moj-profil">
                      Mój profil
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={() => setRedirectToHome(true)}
                      className="no-border-btn no-bg-btn pure-btn"
                    >
                      Wyloguj
                    </button>
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

UserNavigation.propTypes = {
  logout: PropTypes.func,
};

export default connect(null, { logout })(UserNavigation);
