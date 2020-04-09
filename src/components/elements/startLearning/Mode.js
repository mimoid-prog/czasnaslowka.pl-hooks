import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import keyboard from "images/keyboard.png";
import mouse from "images/mouse.png";
import { ReactComponent as Arrow } from "images/arrow.svg";

const Mode = (props) => {
  let location = useLocation();
  let history = useHistory();

  return (
    <div className="mode">
      <h2 className="secondary-title">Wybierz tryb:</h2>
      <div className="modes-box">
        <Link
          to={{
            pathname: "/nauka",
            state: {
              id: location.state.id,
              method: "with",
              public: location.state.public,
            },
          }}
          className="writing-mode mode-item"
        >
          <img src={keyboard} className="writing-icon" alt="Ikona klawiatury" />
          <p>Z pisaniem</p>
        </Link>
        <Link
          to={{
            pathname: "/nauka",
            state: {
              id: location.state.id,
              method: "without",
              public: location.state.public,
            },
          }}
          className="without-mode mode-item"
        >
          <img src={mouse} className="without-icon" alt="Ikona myszki" />
          <p>Bez pisania</p>
        </Link>
      </div>
      <button onClick={history.goBack} className="no-border-btn pure-btn back">
        <Arrow className="back-icon" />
        <p>Wróć</p>
      </button>
    </div>
  );
};

export default Mode;
