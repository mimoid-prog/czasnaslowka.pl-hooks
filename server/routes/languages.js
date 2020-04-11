const express = require("express");
const Language = require("../models/Languages");

const router = express.Router();

router.post("/fetch_languages", (req, res) => {
  Language.find()
    .then((languages) => {
      const data = [];
      languages.forEach((item) => {
        data.push({
          languageName: item.languageName,
          language: item.language,
          image: item.image,
        });
      });
      res.json({ languages: data });
    })
    .catch(() => {
      res.status(400).json({ error: "Błąd pobierania języków." });
    });
});

module.exports = router;
