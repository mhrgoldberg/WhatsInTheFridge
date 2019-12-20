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
  carbsDaily: {
    type: Number
  },
  fatsTotal: {
    type: Number
  },
  fatsDaily: {
    type: Number
  },
  proteinTotal: {
    type: Number
  },
  proteinDaily: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = mongoose.model("recipes", RecipeSchema);