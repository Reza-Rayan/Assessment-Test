const Validator = require("fastest-validator");

const v = new Validator();

const realPersonValidator = v.compile({
  fullname: {
    type: "string",
    empty: false,
    required: true,
    min: 3,
    messages: {
      required: "نام و نام خانوادگی فیلد الزامی است",
      min: "نام و نام خانوادگی باید حداقل شامل 3 حرف باشد",
    },
  },
  nationalCode: {
    type: "string",
    empty: false,
    required: true,
    length: 10,
    numeric: true,
    messages: {
      required: "کد ملی فیلد الزامی است",
      length: "کد ملی باید ۱۰ رقمی باشد",
      numeric: "کد ملی باید عددی باشد",
    },
  },
  age: {
    type: "number",
    integer: true,
    positive: true,
    min: 18,
    max: 100,
    required: true,
    messages: {
      required: "سن فیلد الزامی است",
      min: "سن باید حداقل 18 سال باشد",
      max: "سن باید حداکثر 100 سال باشد",
    },
  },
});

const validateRealPerson = (data) => {
  const validationResult = realPersonValidator(data);
  if (validationResult !== true) {
    throw new Error(validationResult.map((error) => error.message).join(", "));
  }
};

module.exports = {
  validateRealPerson,
};
