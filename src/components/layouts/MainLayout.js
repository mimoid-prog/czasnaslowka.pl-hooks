import React from "react";
import { connect } from "react-redux";
import UserNavigation from "../elements/navigations/UserNavigation";
import GuestNavigation from "../elements/navigations/GuestNavigation";
import Footer from "../elements/footer/Footer";
import "./mainLayout.css";

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      {props.isAuthenticated ? <UserNavigation /> : <GuestNavigation />}
      <div className="main-layout-content">{props.children}</div>
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps)(MainLayout);
