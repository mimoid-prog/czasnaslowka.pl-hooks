import React from "react";
import { ReactComponent as Logo } from "images/logo.svg";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <ul>
          <li>kontakt@czasnaslowka.pl</li>
          <li>Regulamin</li>
          <li>
            <Logo className="footer-logo" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
