import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserSets } from "actions/userSets";
import { fetchLanguages } from "actions/languages";
import Loading from "components/utils/Loading";
import Languages from "./Languages";
import Sets from "./Sets";

const SetsAndLanguages = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const sets = props.setsFetched;
  const languages = props.languagesFetched;

  useEffect(() => {
    if (props.isAuthenticated) {
      if (sets === false && languages === false)
        Promise.all([props.fetchUserSets(), props.fetchLanguages()]).then(() =>
          setIsLoading(false)
        );
      else if (sets === false)
        props.fetchUserSets().then(() => setIsLoading(false));
      else if (languages === false)
        props.fetchLanguages().then(() => setIsLoading(false));
      else setIsLoading(false);
    } else {
      if (languages === false)
        props.fetchLanguages().then(() => setIsLoading(false));
      else setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {props.isAuthenticated && (
            <div className="sets-section">
              <Sets />
            </div>
          )}

          <div className="languages-section">
            <Languages />
          </div>
        </>
      )}
    </>
  );
};

SetsAndLanguages.propTypes = {
  fetchUserSets: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    setsFetched: !!state.sets.fetched,
    languagesFetched: !!state.languages.fetched,
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps, { fetchUserSets, fetchLanguages })(
  SetsAndLanguages
);
