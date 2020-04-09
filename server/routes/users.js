const express = require("express");
const User = require("../models/User");
const { sendConfirmationEmail } = require("../mailer");
const request = require("request");
const yup = require("yup");
const parseErrors = require("../utils/parseErrors");

const router = express.Router();

router.post("/", (req, res) => {
  const data = req.body.user;
  console.log(data);
  validationSchema
    .validate(data)
    .catch((err) => {
      res.json({ error: err.message });
    })
    .then(() => {
      const { email, creationDate, password } = data;
      const user = new User({ email, creationDate });
      user.setPassword(password);
      user.setConfirmationToken();
      user
        .save()
        .then((userRecord) => {
          sendConfirmationEmail(userRecord);
          res.json({});
        })
        .catch((err) => {
          res.status(400).json({ error: parseErrors(err.errors).global });
        });
    });
});

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Niepoprawny adres email.")
    .max(50, "Maksymalna liczba znaków emaila to 50.")
    .required("Pole email jest wymagane."),
  password: yup
    .string()
    .min(5, "Hasło jest za krótkie.")
    .max(50, "Maksymalna liczba znaków hasła to 50.")
    .required("Pole hasło jest wymagane."),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Hasła różnią się od siebie.")
    .required("Pole powtórz hasło jest wymagane."),
  creationDate: yup.string().max(12),
});

module.exports = router;
