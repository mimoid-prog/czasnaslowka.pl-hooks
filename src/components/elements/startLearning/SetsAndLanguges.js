import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSets } from "../../actions/sets";
import { fetchLanguages } from "../../actions/languages";

const SetsAndLanguages = () => {
  return <div></div>;
};

SetsAndLanguages.propTypes = {
  fetchSets: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    setsFetched: !!state.sets.fetched,
    languagesFetched: !!state.languages.fetched,
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps, { fetchSets, fetchLanguages })(
  SetsAndLanguages
);
