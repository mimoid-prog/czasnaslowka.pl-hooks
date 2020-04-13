import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import BubbleLoading from "components/utils/BubbleLoading";
import "./form.css";
import PropTypes from "prop-types";

const ResetPasswordForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object({
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

        props
          .submit({
            ...values,
            token: props.token,
          })
          .catch((err) => {
            setIsLoading(false);
            setErrorMessage(err.response.data.error);
          });
      }}
    >
      <Form className="form">
        <FormInput label="Hasło" name="password" type="password" />
        <FormInput
          label="Powtórz hasło"
          name="repeatPassword"
          type="password"
        />
        <button type="submit" className="no-border-btn blue-btn form-btn">
          {isLoading ? <BubbleLoading /> : "ZMIEŃ"}
        </button>
        <p className="form-input-message-error form-error">{errorMessage}</p>
      </Form>
    </Formik>
  );
};

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
