const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredeintSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number
  },
  measureLabel: {
    type: String
  },
  calories: {
    type: Number
  }
});

module.exports = mongoose.model("ingredients", IngredeintSchema);