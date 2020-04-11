const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    language: { type: String, required: true },
    polishWords: [{ type: String }],
    foreignWords: [{ type: String }],
    icon: { type: String },
  },
  {
    collection: "publicSets",
  }
);

module.exports = mongoose.model("PublicSet", schema);
