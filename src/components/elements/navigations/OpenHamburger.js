import React from "react";
import "./hamburger.css";

const OpenHamburger = (props) => {
  return (
    <button
      onClick={props.openMenu}
      className="no-border-btn no-bg-btn pure-btn open-hamburger"
    >
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </button>
  );
};

export default OpenHamburger;
