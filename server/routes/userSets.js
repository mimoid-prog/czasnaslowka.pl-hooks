const express = require("express");
const Set = require("../models/Sets");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
router.use(authenticate);

router.post("/fetch_user_set", (req, res) => {
  const userID = req.currentUser._id;
  const setID = req.body.id;

  Set.findOne({ _id: setID, owner: userID })
    .then((set) => {
      res.json({ set });
    })
    .catch(() => {
      res.status(400).json({ error: "Błąd. Nie posiadasz takiego zestawu." });
    });
});

router.post("/fetch_user_sets", async (req, res) => {
  const userID = req.currentUser._id;
  fetchUserSets(userID)
    .then((sets) => {
      res.json({ sets });
    })
    .catch(() => {
      res
        .status(400)
        .json({ error: "Błąd pobierania zestawów. Spróbuj ponownie." });
    });
});

router.post("/create_set", (req, res) => {
  const userID = req.currentUser._id;
  const set = req.body.set;

  const newSet = new Set({
    name: set.name,
    icon: set.language,
    language: set.language,
    owner: userID,
    foreignWords: set.foreignWords,
    polishWords: set.polishWords,
  });

  newSet
    .save()
    .then((createdSet) => {
      fetchUserSets(userID)
        .then((sets) => {
          res.json({ sets, createdSet });
        })
        .catch(() => {
          res
            .status(400)
            .json({ error: "Błąd pobierania zestawów. Spróbuj ponownie." });
        });
    })
    .catch(() => {
      res
        .status(400)
        .json({ error: "Błąd tworzenia zestawu. Spróbuj ponownie." });
    });
});

router.post("/update_set", (req, res) => {
  const userID = req.currentUser._id;
  const set = req.body.set;

  Set.findOne({ _id: set._id, owner: userID })
    .then(() => {
      Set.findByIdAndUpdate(
        set._id,
        {
          name: set.name,
          icon: set.language,
          language: set.language,
          foreignWords: set.foreignWords,
          polishWords: set.polishWords,
        },
        { new: true }
      )
        .then((updatedSet) => {
          fetchUserSets(userID)
            .then((sets) => {
              res.json({ sets, updatedSet });
            })
            .catch(() => {
              res
                .status(400)
                .json({ error: "Błąd pobierania zestawów. Spróbuj ponownie." });
            });
        })
        .catch(() => {
          res
            .status(400)
            .json({ error: "Błąd aktualizowania zestawu. Spróbuj ponownie." });
        });
    })
    .catch(() => {
      res.status(400).json({ error: "Błąd. Nie posiadasz takiego zestawu." });
    });
});

router.post("/remove_set", (req, res) => {
  const userID = req.currentUser._id;
  const setID = req.body.id;

  Set.findOne({ _id: setID, owner: userID })
    .then((set) => {
      Set.deleteOne({ _id: setID }).then(() => {
        fetchUserSets(userID)
          .then((sets) => {
            res.json({ sets });
          })
          .catch(() => {
            res
              .status(400)
              .json({ error: "Błąd pobierania zestawów. Spróbuj ponownie." });
          });
      });
    })
    .catch(() => {
      res.status(400).json({ error: "Nie masz uprawnień do tego zestawu." });
    });
});

const fetchUserSets = async (id) => {
  const sets = await Set.find({ owner: id });
  let fSets = [];
  sets.forEach((set) => {
    fSets.push({
      id: set._id,
      name: set.name,
      icon: set.icon,
    });
  });
  return fSets;
};

module.exports = router;
