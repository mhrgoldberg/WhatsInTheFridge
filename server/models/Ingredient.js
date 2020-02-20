const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: mongoose.Decimal128
  },
  measureLabel: {
    type: String
  },
  calories: {
    type: mongoose.Decimal128
  }
});

module.exports = mongoose.model("ingredients", IngredientSchema);