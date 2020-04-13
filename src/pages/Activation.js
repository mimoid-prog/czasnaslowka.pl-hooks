import React, { useState, useEffect } from "react";
import SecondaryLayout from "components/layouts/SecondaryLayout";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "components/utils/Loading";
import { connect } from "react-redux";
import { confirm } from "actions/auth";
import { useParams } from "react-router-dom";

const Activation = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  let { token } = useParams();

  useEffect(() => {
    props
      .confirm(token)
      .then(() => {
        setIsError(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <SecondaryLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ textAlign: "center" }}>
          <h4 className="quaternary-title">
            {isError ? "Ups, coś poszło nie tak" : "Konto aktywowane"}
          </h4>
          <p>
            {isError
              ? "Wystąpił błąd. Sprawdź poprawność linku lub wygeneruj nowy link weryfikacyjny."
              : "Twoje konto zostało aktywowane i możesz już z niego korzystać. Przejdź na stronę główną, aby się zalogować."}
          </p>
          <Link to="/" class="no-border-btn pure-btn secondary-home-link">
            Strona główna
          </Link>
        </div>
      )}
    </SecondaryLayout>
  );
};

Activation.propTypes = {
  confirm: PropTypes.func.isRequired,
};

export default connect(null, { confirm })(Activation);
