const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONOGO_URI);
    console.log("Mongodb connected successfully");
  } catch (err) {
    console.log("Mongodb connection error", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
