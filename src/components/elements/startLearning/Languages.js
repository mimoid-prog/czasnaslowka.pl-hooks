import React from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

const Languages = (props) => {
  let match = useRouteMatch();

  return (
    <div className="languages">
      <h2 className="secondary-title">Gotowe zestawy</h2>
      <ul className="sets-and-languages-list">
        {props.languages.map((item, i) => (
          <li className="item set-field" key={i}>
            <Link
              to={{
                pathname: `${match.path}/kategorie`,
                state: {
                  language: item.language,
                },
              }}
            >
              <img
                src={require(`images/icons/flags/${item.image}.png`)}
                alt={item.languageName}
              />
              <p>{item.languageName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    languages: state.languages.items,
  };
}

export default connect(mapStateToProps)(Languages);
