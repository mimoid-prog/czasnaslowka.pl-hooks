import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import BubbleLoading from "components/utils/BubbleLoading";
import "./form.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "actions/users";
import PropTypes from "prop-types";

const SignupForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Niepoprawny adres email")
          .max(50, "Maksymalna liczba znaków to 50")
          .required("To pole jest wymagane"),
        password: Yup.string()
          .min(5, "Hasło jest za krótkie")
          .max(50, "Maksymalna liczba znaków to 50")
          .required("To pole jest wymagane"),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Hasła różnią się od siebie")
          .required("To pole jest wymagane"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        setSubmitting(false);

        const today = new Date();
        const creationDate =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();

        values.creationDate = creationDate;
        props
          .signup(values)
          .then(() => {
            setIsLoading(false);
            props.showMessage();
          })
          .catch((err) => {
            setIsLoading(false);
            setErrorMessage(err.response.data.error);
          });
      }}
    >
      <Form className="form">
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Hasło" name="password" type="password" />
        <FormInput
          label="Powtórz hasło"
          name="repeatPassword"
          type="password"
        />
        <button type="submit" className="no-border-btn  blue-btn form-btn">
          {isLoading ? <BubbleLoading /> : "ZAREJESTRUJ"}
        </button>
        <p className="form-input-message-error form-error">{errorMessage}</p>

        <div className="change-form">
          Masz już konto?
          <br />
          <Link to="/logowanie" className="change-form-link">
            Zaloguj się
          </Link>
        </div>
      </Form>
    </Formik>
  );
};

SignupForm.propTypes = { signup: PropTypes.func.isRequired };

export default connect(null, { signup })(SignupForm);
