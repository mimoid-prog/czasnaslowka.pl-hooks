import React, { useState } from "react";
import SecondaryLayout from "components/layouts/SecondaryLayout";
import ForgotPasswordForm from "components/forms/ForgotPasswordForm";
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {
  const [showForm, setShowForm] = useState(true);
  const showMessage = () => setShowForm(false);

  return (
    <SecondaryLayout>
      {showForm ? (
        <>
          <h3 className="quaternary-title">
            Podaj adres email przypisany do konta, aby je odzyskać
          </h3>
          <ForgotPasswordForm showMessage={showMessage} />
        </>
      ) : (
        <div className="form-message">
          <h4 className="quaternary-title">Wysłano wiadomość</h4>
          <p>
            Na twoją skrzynkę pocztową został wysłany link umożliwiający zmianę
            hasła.
          </p>
          <Link to="/" class="no-border-btn pure-btn secondary-home-link">
            Strona główna
          </Link>
        </div>
      )}
    </SecondaryLayout>
  );
};

export default ForgotPassword;
