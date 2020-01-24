const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
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

module.exports = mongoose.model("ingredients", IngredientSchema);