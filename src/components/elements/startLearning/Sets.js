import React from "react";
import { connect } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

const Sets = (props) => {
  let location = useLocation();
  let match = useRouteMatch();

  return (
    <div className="sets">
      <h2 className="secondary-title">Moje zestawy</h2>
      {!props.sets ? (
        <div className="sets-message">
          <h4 className="quaternary-title">Nie posiadasz żadnych zestawów.</h4>
          {location.pathname.includes("zacznij-nauke") ? (
            <p>
              Przejdź do zakładki <Link to="/moje-zestawy">Moje zestawy</Link>,
              aby utworzyć nowy zestaw.
            </p>
          ) : (
            <p>Utwórz nowy zestaw, a pojawi się on w tym miejscu.</p>
          )}
        </div>
      ) : (
        <ul className="sets-and-languages-list">
          {props.sets.map((item, i) => (
            <li className="item set-field" key={i}>
              <Link
                to={{
                  pathname: `${match.path}/tryb`,
                  state: {
                    id: item.id,
                    public: false,
                  },
                }}
              >
                <img
                  src={require(`images/icons/flags/${item.icon}.png`)}
                  alt="Flaga zestawu"
                />
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    sets: state.sets.items,
  };
}

export default connect(mapStateToProps)(Sets);
