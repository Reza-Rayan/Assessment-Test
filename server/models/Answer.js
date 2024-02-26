const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
