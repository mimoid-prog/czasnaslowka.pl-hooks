import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NoSetsMessage from "components/elements/noSetsMessage/NoSetsMessage";

const UserSetsEdit = (props) => {
  return (
    <div className="user-sets-edit">
      <div className="container">
        <h2 className="secondary-title user-sets-edit-title">Twoje zestawy</h2>
        {props.sets.length === 0 ? (
          <NoSetsMessage />
        ) : (
          <ul className="user-sets-edit-list">
            {props.sets.map((set, i) => (
              <li
                key={i}
                className={`user-sets-edit-list-item ${
                  props.currentSetId === set.id ? "active" : ""
                }`}
              >
                <img
                  src={require(`images/icons/flags/${set.icon}.png`)}
                  alt="flaga"
                />
                <p>{set.name}</p>
                <div className="buttons">
                  <button
                    onClick={() => props.checkForChanges(set.id, "fetch")}
                    className="pure-btn blue-btn edit-btn"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() =>
                      props.createWarningMessage("remove", set.id, set.name)
                    }
                    className="pure-btn pink-btn delete-btn"
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

UserSetsEdit.propTypes = {
  createWarningMessage: PropTypes.func.isRequired,
  checkForChanges: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    sets: state.sets.items,
  };
}

export default connect(mapStateToProps)(UserSetsEdit);
