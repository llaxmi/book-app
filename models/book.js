var mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: {
    type: String,
    enum: ["fiction", "leadership", "self-help", "history", "coding"],
  },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Books", BookSchema);
