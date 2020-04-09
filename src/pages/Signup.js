import React, { useState } from "react";
import SecondaryLayout from "components/layouts/SecondaryLayout";
import SignupForm from "components/forms/SignupForm";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [showForm, setShowForm] = useState(true);
  const showMessage = () => setShowForm(false);

  return (
    <SecondaryLayout>
      {showForm ? (
        <>
          <h2 className="secondary-title">Rejestracja</h2>
          <SignupForm showMessage={showMessage} />
        </>
      ) : (
        <div className="form-message">
          <h4 className="quaternary-title">Konto zostało utworzone.</h4>
          <p>
            Wejdź na swoją skrzynkę pocztową i wciśnij link weryfikacyjny, aby
            konto zostało aktywowane.
          </p>
          <Link to="/" class="no-border-btn pure-btn form-home-link">
            Strona główna
          </Link>
        </div>
      )}
    </SecondaryLayout>
  );
};

export default Signup;
