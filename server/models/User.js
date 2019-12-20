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
  }],
  savedIngredients: [{
    type: Schema.Types.ObjectId,
    ref: "ingredients"
  }]

});

UserSchema.statics.addRecipe = (userId, recipeId) => {
  const User = mongoose.model('users');

  User.findById(userId)
    .then(user => {
      user.savedRecipes.push(recipeId);
      user.save();
    })
}

UserSchema.statics.addIngredient = (userId, ingredinetId) => {
  const User = mongoose.model('users');

  User.findById(userId)
    .then(user => {
      user.savedIngredients.push(ingredinetId);
      user.save();
    })
}

module.exports = mongoose.model("users", UserSchema);
