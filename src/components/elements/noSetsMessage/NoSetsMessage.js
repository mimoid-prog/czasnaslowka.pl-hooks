import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./noSetsMessage.css";

const NoSetsMessage = () => {
  let location = useLocation();
  return (
    <div className="user-sets-message">
      <h4 className="quaternary-title">Nie posiadasz żadnych zestawów.</h4>
      {location.pathname.includes("zacznij-nauke") ? (
        <p>
          Przejdź do zakładki <Link to="/moje-zestawy">Moje zestawy</Link>, aby
          utworzyć nowy zestaw.
        </p>
      ) : (
        <p>Utwórz nowy zestaw, a pojawi się on w tym miejscu.</p>
      )}
    </div>
  );
};

export default NoSetsMessage;
