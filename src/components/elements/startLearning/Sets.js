import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import NoSetsMessage from "components/elements/noSetsMessage/NoSetsMessage";

const Sets = (props) => {
  let match = useRouteMatch();
  return (
    <div className="sets">
      <h2 className="secondary-title">Moje zestawy</h2>
      {props.sets.length === 0 ? (
        <NoSetsMessage />
      ) : (
        <ul className="sets-and-languages-list">
          {props.sets.map((item, i) => (
            <li className="item set-field" key={i}>
              <Link
                to={{
                  pathname: `${match.path}/tryb`,
                  state: {
                    id: item.id,
                    public: "no",
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
