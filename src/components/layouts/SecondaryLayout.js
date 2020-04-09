import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "images/logo.svg";
import logoWithFlags from "images/logoWithFlags.png";
import "./secondary.css";

const SecondaryLayout = (props) => {
  return (
    <div className="secondary">
      <Link to="/" className="secondary-back-home">
        <Logo className="logo" />
        <img
          src={logoWithFlags}
          className="logo-with-flags"
          alt="czasnaslowka.pl logo"
        />
      </Link>
      <div className="secondary-content">{props.children}</div>
    </div>
  );
};

export default SecondaryLayout;
