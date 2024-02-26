const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { validateRealPerson } = require("../validation/RealUserValidate");

const realPersonSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  nationalCode: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

realPersonSchema.plugin(mongoosePaginate);

realPersonSchema.pre("validate", function (next) {
  try {
    validateRealPerson({
      fullname: this.fullname,
      nationalCode: this.nationalCode,
      age: this.age,
    });
    next();
  } catch (error) {
    next(new Error(error.message));
  }
});

const RealPerson = mongoose.model("RealPerson", realPersonSchema);

module.exports = RealPerson;
