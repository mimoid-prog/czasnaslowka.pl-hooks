import React from "react";
import MainLayout from "components/layouts/MainLayout";
import "./mySets.css";
import UserSets from "components/elements/mySets/UserSets";
import SetEdition from "components/elements/mySets/SetEdition";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchUserSet,
  fetchUserSets,
  createSet,
  updateSet,
  removeSet,
} from "actions/userSets";

const MySets = () => {
  return (
    <MainLayout>
      <UserSets />
      <SetEdition />
    </MainLayout>
  );
};

MySets.propTypes = {
  fetchUserSet: PropTypes.func.isRequired,
  fetchUserSets: PropTypes.func.isRequired,
  createSet: PropTypes.func.isRequired,
  updateSet: PropTypes.func.isRequired,
  removeSet: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fetched: !!state.sets.fetched,
  };
}

export default connect(mapStateToProps, {
  fetchUserSet,
  fetchUserSets,
  createSet,
  updateSet,
  removeSet,
})(MySets);
