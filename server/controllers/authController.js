// Model
const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwtExpiration, jwtSecret } = require("../config/jwtConfig");

// @POST Sign up user for admin panel
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check Existing User
    const existing = await Auth.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "این ایمیل قبلاً ثبت نام شده است",
      });
    }

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Auth({ username, email, password: hashedPassword });
    const user = await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "ثبت نام با موفقیت انجام شد", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطای سرور رخ داده است" });
  }
};

// @POST Login user for admin panel
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "کاربری با این ایمیل یافت نشد" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "رمز عبور اشتباه است" });
    }
    const token = jwt.sign({ authId: user._id }, jwtSecret, {
      expiresIn: jwtExpiration,
    });
    res.cookie("accessToken", token, {
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, message: "ورود موفقیت آمیز بود", user, token });
  } catch (error) {
    console.log("Internal Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Error", error });
  }
};
