const mongoose = require("mongoose");
const { validateAuth } = require("../validation/AuthValidate");

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

authSchema.pre("validate", function (next) {
  try {
    validateAuth({
      username: this.username,
      email: this.email,
      password: this.password,
    });
    next();
  } catch (error) {
    next(new Error(error.message));
  }
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
