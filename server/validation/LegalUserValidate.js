const Validator = require("fastest-validator");

const v = new Validator();

const legalPersonValidator = v.compile({
  fullname: {
    type: "string",
    empty: false,
    required: true,
    messages: { required: "نام و نام خانوادگی الزامی است" },
  },
  nationalCode: {
    type: "string",
    empty: false,
    required: true,
    length: 10,
    numeric: true,
    messages: {
      required: "کد ملی الزامی است",
      length: "کد ملی باید 10 رقم باشد",
      numeric: "کد ملی باید عددی باشد",
    },
  },
  phone: {
    type: "string",
    empty: false,
    required: true,
    length: 11,
    messages: {
      required: "شماره تلفن الزامی است",
      length: "شماره تلفن باید 11 رقم باشد",
    },
  },
  mobile: {
    type: "string",
    empty: false,
    required: true,
    length: 11,
    messages: {
      required: "شماره موبایل الزامی است",
      length: "شماره موبایل باید 11 رقم باشد",
    },
  },
  company: {
    type: "string",
    empty: false,
    required: true,
    messages: { required: "نام شرکت الزامی است" },
  },
  experience: {
    type: "number",
    integer: true,
    positive: true,
    required: true,
    messages: { required: "سابقه کار الزامی است" },
  },
});

const validateLegalPerson = data => {
  const validationResult = legalPersonValidator(data);
  if (validationResult !== true) {
    throw new Error(validationResult.map(error => error.message).join(", "));
  }
};

module.exports = {
  validateLegalPerson,
};
