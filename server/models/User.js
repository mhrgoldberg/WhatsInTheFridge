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

UserSchema.statics.removeRecipe = (userId, recipeId) => {
  const User = mongoose.model('users');
  
  User.findById(userId)
    .then(user => {
      user.savedRecipes.pull(recipeId);
      user.save();
    })
}

UserSchema.statics.addIngredient = (userId, ingredientId) => {
  const User = mongoose.model('users');

  User.findById(userId)
    .then(user => {
      user.savedIngredients.push(ingredientId);
      user.save();
    })
}

UserSchema.statics.removeIngredient = (userId, ingredientId) => {
  const User = mongoose.model('users');

  User.findById(userId)
    .then(user => {
      user.savedIngredients.pull(ingredientId);
      user.save();
    })
}

module.exports = mongoose.model("users", UserSchema);
