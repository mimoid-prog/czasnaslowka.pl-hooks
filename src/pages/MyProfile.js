import React, { useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPasswordRequest } from "actions/auth";
import "./myProfile.css";
import user from "images/user.png";
import settings from "images/settings.png";

const MyProfile = (props) => {
  const [changePasswordMessage, setChangePasswordMessage] = useState(false);

  const changePassword = () => {
    const data = { email: props.email };
    props.resetPasswordRequest(data).then(() => setChangePasswordMessage(true));
  };

  return (
    <MainLayout>
      <div className="my-profile">
        <div className="container">
          <div className="my-account-section">
            <h3 className="tertiary-title">Moje konto</h3>
            <div className="my-account-box">
              <img src={user} alt="Ikonka użytkownika" />
              <p>Email: {props.email}</p>
              <p>Data założenia: {props.creationDate}</p>
            </div>
          </div>
          <div className="settings-section">
            <h3 className="tertiary-title">Ustawienia</h3>
            <div className="settings-box">
              <img src={settings} alt="Ikonka ustawień" />
              <button
                className="no-border-btn no-bg-btn pure-btn"
                onClick={changePassword}
              >
                Zmień hasło
              </button>
              {changePasswordMessage && (
                <>
                  <p> - </p>
                  <p>
                    Link ze zmianą hasła został wysłany na twoją skrzynkę
                    pocztową. Wyloguj się, aby móc z niego skorzystać.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

MyProfile.propTypes = {
  email: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
    creationDate: state.user.creationDate,
  };
}

export default connect(mapStateToProps, { resetPasswordRequest })(MyProfile);
