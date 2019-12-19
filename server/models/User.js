const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  savedRecipes: [{
    type: Schema.Types.ObjectId,
    ref: "recipes"
  }]
});

module.exports = mongoose.model("users", UserSchema);
