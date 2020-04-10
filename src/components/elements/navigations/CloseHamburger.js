import React from "react";
import "./hamburger.css";

const CloseHamburger = (props) => {
  return (
    <div className="close-hamburger-box">
      <button
        className="no-border-btn no-bg-btn pure-btn close-hamburger"
        onClick={props.closeMenu}
      >
        <div className="bar" />
        <div className="bar" />
      </button>
    </div>
  );
};

export default CloseHamburger;
