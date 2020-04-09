import React from "react";
import GuestNavigation from "../navigations/GuestNavigation";
import { ReactComponent as Planet } from "images/planet.svg";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <GuestNavigation />
        <div className="container">
          <div className="header-inner">
            <div className="header-visual">
              <Planet className="planet" />
            </div>
            <div className="header-intro">
              <h2>
                Wybierz język i
                <br />
                zacznij naukę.
                <br />
                Po prostu.
              </h2>
              <Link
                to="/zacznij-nauke"
                className="no-border-btn blue-btn get-started-btn"
              >
                Rozpocznij
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
