const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const uri = "mongodb://127.0.0.1:27017/assessment";

    if (!uri) {
      throw new Error("MongoDB URI is missing");
    }

    await mongoose.connect(uri);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = dbConnect;
