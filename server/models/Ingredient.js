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
  },
  carbsTotal: {
    type: Number
  },
  fatsTotal: {
    type: Number
  },
  proteinTotal: {
    type: Number
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: 'recipes'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = mongoose.model("ingredients", IngredeintSchema);