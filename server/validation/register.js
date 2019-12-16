const Validator = require("validator");
const validText = require("./valid-text");
const User = require("../models/User");

module.exports = function validateRegisterInput(data) {
  data.password = validText(data.password) ? data.password : "";
  data.username = validText(data.username) ? data.username : "";

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 6, max: 26 })) {
    return {
      message: "Password must be between 6 and 26 characters",
      isValid: false
    };
  }

  if (Validator.isEmpty(data.username)) {
    return { message: "Username field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true
  };
};
