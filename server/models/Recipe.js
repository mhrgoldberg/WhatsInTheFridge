const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  recipeURL: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String
  }],
  calories: {
    type: Number
  },
  servings: {
    type: Number
  },
  carbsTotal: {
    type: Number
  },
  fatsTotal: {
    type: Number
  },
  proteinTotal: {
    type: Number
  }
});

module.exports = mongoose.model("recipes", RecipeSchema);