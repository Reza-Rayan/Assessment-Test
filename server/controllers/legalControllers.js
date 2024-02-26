// Model
const LegalPerson = require("../models/LegalPerson");

// @POST Create a Legal Person
exports.createLegalUser = async (req, res) => {
  const { fullname, nationalCode, phone, mobile, company, experience } =
    req.body;

  try {
    const newLegalUser = new LegalPerson({
      fullname,
      nationalCode,
      phone,
      mobile,
      company,
      experience,
    });

    const existingUser = await LegalPerson.findOne({ nationalCode });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "این کدملی قبلا در آزمون شرکت کرده است",
      });
    }

    const legalUser = await newLegalUser.save();

    res.status(200).json({
      success: true,
      message: "کاربر حقوقی ایجاد شد",
      legalUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @GET show All Legal Users In a List
exports.showLegalUsers = async (req, res) => {
  try {
    const legalUsers = await LegalUser.find();

    if (legalUsers.length === 0) {
      res
        .status(400)
        .json({ success: true, message: "هیچ کاربر حقوقی وجود ندارد" });
    } else {
      res.status(200).json({ success: true, legalUsers });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
