import React from "react";
import { Link, useHistory } from "react-router-dom";
import keyboard from "images/keyboard.png";
import mouse from "images/mouse.png";
import { ReactComponent as Arrow } from "images/arrow.svg";
import useQuery from "components/utils/useQuery";

const Mode = () => {
  let history = useHistory();
  let query = useQuery();
  const id = query.get("id");
  const publicSet = query.get("public");

  return (
    <div className="mode">
      <h2 className="secondary-title">Wybierz tryb:</h2>
      <div className="modes-box">
        <Link
          to={`/nauka?id=${id}&method=with&public=${publicSet}`}
          className="writing-mode mode-item"
        >
          <img src={keyboard} className="writing-icon" alt="Ikona klawiatury" />
          <p>Z pisaniem</p>
        </Link>
        <Link
          to={`/nauka?id=${id}&method=without&public=${publicSet}`}
          className="without-mode mode-item"
        >
          <img src={mouse} className="without-icon" alt="Ikona myszki" />
          <p>Bez pisania</p>
        </Link>
      </div>
      <button
        onClick={history.goBack}
        className="no-border-btn no-bg-btn pure-btn back"
      >
        <Arrow className="back-icon" />
        <p>Wróć</p>
      </button>
    </div>
  );
};

export default Mode;
