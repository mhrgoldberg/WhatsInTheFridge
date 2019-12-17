const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("users");
const keys = require("../../config/keys");

const validateRegisterInput = require("../validation/register.jsx");
const validateLoginInput = require("../validation/login.jsx");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    const { username, password } = data;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("This user already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      {
        username,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const { _id } = data;

    const user = await User.findById(_id);
    if (!user) throw new Error("This user does not exist");

    const token = "";

    return { token, loggedIn: false, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    const { username, password } = data;

    const user = await User.findOne({ username });
    if (!user) throw new Error("This user does not exist");

    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, logout, login, verifyUser };
