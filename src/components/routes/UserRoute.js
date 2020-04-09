import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const UserRoute = ({ isAuthenticated, children, ...rest }) => (
  <Route
    {...rest}
    render={() => (isAuthenticated ? children : <Redirect to="/" />)}
  />
);

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(UserRoute);
