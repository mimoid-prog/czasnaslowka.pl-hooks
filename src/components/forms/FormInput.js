import React from "react";
import { useField } from "formik";
import "./form.css";

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={`form-input ${
          meta.touched && meta.error ? "form-input-error" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="form-input-message-error">{meta.error}</p>
      ) : null}
    </>
  );
};

export default FormInput;
