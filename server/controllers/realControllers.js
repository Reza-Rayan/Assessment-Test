// Model
const RealUser = require("../models/RealPerson");
const Answer = require("../models/Answer");

// Transform
const realPersonTransform = require("../transforms/realPersonsTransform");

// @POST Create a Real Person
exports.createRealUser = async (req, res) => {
  const { fullname, nationalCode, age } = req.body;
  try {
    const newRealUser = new RealUser({ fullname, nationalCode, age });
    const existingUser = await RealUser.findOne({ nationalCode });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "این کدملی قبلا در آزمون شرکت کرده است",
      });
    }

    if (!newRealUser) {
      return res
        .status(404)
        .json({ success: false, message: "کاربر پیدا نشد" });
    }

    const realUser = await newRealUser.save();

    res
      .status(200)
      .json({ success: true, message: " کاربر حقیقی ایجاد شد ", realUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @GET show All Real Users In a List
exports.showRealUsers = async (req, res) => {
  try {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const realUsers = await RealUser.paginate({}, options);

    if (realUsers.length === 0) {
      res
        .status(400)
        .json({ success: true, message: "هیچ کاربر حقیقی وجود ندارد" });
    } else {
      res.status(200).json({
        success: true,
        data: new realPersonTransform()
          .withPaginate()
          .transformCollection(realUsers),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @POST Add an Answer to Real User's Answers
exports.addAnswersToRealUser = async (req, res) => {
  const { nationalCode } = req.params;
  const { answers, score } = req.body;

  try {
    // Check if the real user exists
    const realUser = await RealUser.findOne({ nationalCode });

    if (!realUser) {
      return res.status(404).json({
        success: false,
        message: "کاربر حقیقی پیدا نشد",
      });
    }

    // Save multiple answers
    const savedAnswers = [];
    for (const { question, answer } of answers) {
      // Create a new answer
      const newAnswer = new Answer({
        question,
        answer,
        realUser: realUser._id,
      });
      // Save the answer
      const finalAnswer = await newAnswer.save();
      savedAnswers.push(finalAnswer._id);
      // Push the answer's Id to the real user's answers array
      realUser.answers.push(finalAnswer._id);
    }
    realUser.score = score;
    // Save the real user to update the answers array
    await realUser.save();

    res.status(200).json({
      success: true,
      message: "پاسخ‌ها با موفقیت افزوده شدند و به کاربر حقیقی اضافه شدند",
      savedAnswers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
