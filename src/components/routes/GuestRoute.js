import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({ isAuthenticated, children, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      !isAuthenticated ? children : <Redirect to="/zacznij-nauke" />
    }
  />
);

GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(GuestRoute);
