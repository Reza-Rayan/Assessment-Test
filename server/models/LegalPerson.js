const mongoose = require("mongoose");
const { validateLegalPerson } = require("../validation/LegalUserValidate");

const legalPersonSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  nationalCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  answers: {
    type: Array,
  },
  creadetAt: {
    type: Date,
    default: Date.now(),
  },
});

legalPersonSchema.pre("validate", function (next) {
  try {
    validateLegalPerson({
      fullname: this.fullname,
      nationalCode: this.nationalCode,
      phone: this.phone,
      mobile: this.mobile,
      company: this.company,
      experience: this.experience,
    });
    next();
  } catch (error) {
    next(new Error(error.message));
  }
});

const LegalPerson = mongoose.model("LegalPerson", legalPersonSchema);

module.exports = LegalPerson;
