const Validator = require("fastest-validator");

const v = new Validator();

const authValidator = v.compile({
  username: {
    type: "string",
    empty: false,
    required: true,
    min: 3,
    messages: {
      required: "  نام کاربری فیلد الزامی می باشد",
      min: " باید حداقل شامل 3 حرف باشد",
    },
  },
  email: {
    type: "string",
    empty: false,
    required: true,
    messages: {
      required: "   ایمیل فیلد الزامی می باشد",
    },
  },
  password: {
    type: "string",
    empty: false,
    required: true,
    min: 6,
    max: 255,
    messages: {
      required: "   رمز عبور فیلد الزامی می باشد",
      min: "رمز عبور باید  شامل حداقل 6 کاراکتر باشد",
      max: "رمز عبور نباید بیشتر از 255  کاراکتر باشد",
    },
  },
});

const validateAuth = (data) => {
  const validationResult = authValidator(data);
  if (validationResult !== true) {
    throw new Error(validationResult.map((error) => error.message).join(", "));
  }
};

module.exports = {
  validateAuth,
};
