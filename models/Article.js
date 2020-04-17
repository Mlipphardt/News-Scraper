const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
