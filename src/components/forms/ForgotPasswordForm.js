import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import BubbleLoading from "components/utils/BubbleLoading";
import "./form.css";
import { connect } from "react-redux";
import { resetPasswordRequest } from "actions/auth";
import PropTypes from "prop-types";

const ForgotPasswordForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Niepoprawny adres email")
          .required("To pole jest wymagane"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsLoading(true);
        setSubmitting(false);

        props
          .resetPasswordRequest(values)
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
        <button type="submit" className="no-border-btn  blue-btn form-btn">
          {isLoading ? <BubbleLoading /> : "WYŚLIJ"}
        </button>
        <p className="form-input-message-error form-error">{errorMessage}</p>
      </Form>
    </Formik>
  );
};

ForgotPasswordForm.propTypes = { login: PropTypes.func.isRequired };

export default connect(null, { resetPasswordRequest })(ForgotPasswordForm);
