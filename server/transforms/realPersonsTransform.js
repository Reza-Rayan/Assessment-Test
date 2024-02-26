const transform = require("./transform");

class realPersonTransform extends transform {
  transform(item) {
    return {
      fullname: item.fullname,
      nationalCode: item.nationalCode,
      age: item.age,
    };
  }
}

module.exports = realPersonTransform;
