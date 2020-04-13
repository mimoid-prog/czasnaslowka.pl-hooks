import React, { useState, useEffect } from "react";
import SecondaryLayout from "components/layouts/SecondaryLayout";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "components/utils/Loading";
import { connect } from "react-redux";
import { validateToken, resetPassword } from "actions/auth";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "components/forms/ResetPasswordForm";

const ResetPassword = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [showForm, setShowForm] = useState(true);

  let { token } = useParams();

  const submit = (data) =>
    props.resetPassword(data).then(() => {
      setShowForm(false);
    });

  useEffect(() => {
    props
      .validateToken(token)
      .then(() => {
        setIsError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setShowForm(false);
        setIsLoading(false);
      });
  }, []);

  return (
    <SecondaryLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {showForm ? (
            <ResetPasswordForm submit={submit} token={token} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <h4 className="quaternary-title">
                {isError ? "Ups, coś poszło nie tak" : "Hasło zmienione"}
              </h4>
              <p>
                {isError
                  ? "Wystąpił błąd. Sprawdź poprawność linku lub wygeneruj nowy link weryfikacyjny."
                  : "Możesz już zalogować się na swoje konto używając nowego hasła."}
              </p>
              <Link to="/" class="no-border-btn pure-btn secondary-home-link">
                Strona główna
              </Link>
            </div>
          )}
        </div>
      )}
    </SecondaryLayout>
  );
};

ResetPassword.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { validateToken, resetPassword })(ResetPassword);
