const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Promise = require("bluebird");

const auth = require("./routes/auth");
const users = require("./routes/users");
const sets = require("./routes/sets");
const authSets = require("./routes/authSets");
const languages = require("./routes/languages");

dotenv.config();

const app = express();
app.use(express.json());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/sets", sets);
app.use("/api/authSets", authSets);
app.use("/api/languages", languages);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
