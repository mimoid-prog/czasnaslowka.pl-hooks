import React, { useState } from "react";
import SecondaryLayout from "components/layouts/SecondaryLayout";
import LoginForm from "components/forms/LoginForm";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
  const [toRender, setToRender] = useState("form");
  const changeRenderedComponent = (data) => {
    if (data.confirmed === true) setToRender("redirect");
    else setToRender("message");
  };

  return (
    <SecondaryLayout>
      {toRender === "form" && (
        <>
          <h2 className="secondary-title">Logowanie</h2>
          <LoginForm changeRenderedComponent={changeRenderedComponent} />
        </>
      )}

      {toRender === "message" && (
        <div className="form-message">
          <h4 className="quaternary-title">Konto nieaktywowane.</h4>
          <p>
            Wejdź na swoją skrzynkę pocztową i wciśnij link weryfikacyjny, aby
            konto zostało aktywowane.
          </p>
          <Link to="/" class="no-border-btn pure-btn form-home-link">
            Strona główna
          </Link>
        </div>
      )}

      {toRender === "redirect" && <Redirect to="/zacznij-nauke" />}
    </SecondaryLayout>
  );
};

export default Login;
