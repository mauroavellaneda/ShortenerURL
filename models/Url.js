const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const urlSchema = new Schema({
  urlOriginal: {
    type: String,
    lowercase: true,
    trim: true,
    required: 'Add a URL'
  },
  urlShort: {
    type: String,
  },
});

urlSchema.pre("save", async function (next) {
  this.urlShort = shortid.generate();
  next();
});

module.exports = mongoose.model("Urls", urlSchema);
