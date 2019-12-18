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
  macros: {     // Numbers are pre-parsed to be per serving
    carbs: {
      total: {
        type: Number
      },
      daily: {
        type: Number
      }
    },
    fats: {
      total: {
        type: Number
      },
      daily: {
        type: Number
      }
    },
    protein: {
      total: {
        type: Number
      },
      daily: {
        type: Number
      }
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = mongoose.model("recipes", RecipeSchema);