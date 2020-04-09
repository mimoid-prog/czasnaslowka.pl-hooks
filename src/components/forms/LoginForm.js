import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import BubbleLoading from "components/utils/BubbleLoading";
import "./form.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "actions/auth";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Niepoprawny adres email")
          .required("To pole jest wymagane"),
        password: Yup.string().required("To pole jest wymagane"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        setSubmitting(false);

        props
          .login(values)
          .then((res) => {
            setIsLoading(false);
            props.changeRenderedComponent(res.user);
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
        <Link to="/przypomnienie-hasla" className="forgot-password-link">
          Zapomiałeś/aś hasła?
        </Link>
        <button type="submit" className="no-border-btn  blue-btn form-btn">
          {isLoading ? <BubbleLoading /> : "ZALOGUJ"}
        </button>
        <p className="form-input-message-error form-error">{errorMessage}</p>

        <div className="change-form">
          Nie masz konta?
          <br />
          <Link to="/rejestracja" className="change-form-link">
            Zarejestruj się
          </Link>
        </div>
      </Form>
    </Formik>
  );
};

LoginForm.propTypes = { login: PropTypes.func.isRequired };

export default connect(null, { login })(LoginForm);
