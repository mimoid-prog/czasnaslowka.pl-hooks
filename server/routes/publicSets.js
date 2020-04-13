const express = require("express");
const PublicSet = require("../models/PublicSets");

const router = express.Router();

router.post("/fetch_public_set", (req, res) => {
  const setID = req.body.id;
  PublicSet.findById(setID)
    .then((set) => {
      if (set) res.json({ set });
      else res.status(400).json({ error: "Wystąpił błąd. Spróbuj ponownie." });
    })
    .catch((err) => {
      res.status(400).json({ error: "Wystąpił błąd. Spróbuj ponownie." });
    });
});

router.post("/fetch_public_sets", (req, res) => {
  const language = req.body.language;
  PublicSet.find({ language })
    .then((sets) => {
      let fSets = [];
      sets.forEach((set) => {
        fSets.push({
          id: set._id,
          name: set.name,
          icon: set.icon,
          quantityOfWords: set.foreignWords.length,
        });
      });

      res.json({ sets: fSets });
    })
    .catch(() => {
      res.status(400).json({ error: "Wystąpił błąd. Spróbuj ponownie." });
    });
});

module.exports = router;
