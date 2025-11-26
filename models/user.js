const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "NORMAL",
    },

    password: {
      type: String,
      required: true,
    },

    // 🔐 Forgot Password Token
    resetToken: {
      type: String,
      default: null,
    },

    // ⏳ Expiry: Valid for 15 min
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
