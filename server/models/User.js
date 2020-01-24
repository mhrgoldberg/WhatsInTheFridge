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
  savedRecipes: {
    type: Array,
    default: []
  },
  savedIngredients: {
    type: Array,
    default: []
  }
});

UserSchema.statics.addRecipe = (args) => {
  const User = mongoose.model('users');

  User.findById(args[userId])
    .then(user => {
      delete args.userId;
      user.savedRecipes[args.recipeURL] = args;
      user.save();
    })
}

UserSchema.statics.removeRecipe = (args) => {
  const User = mongoose.model('users');
  
  User.findById(args[userId])
    .then(user => {
      let recipeKey = args.recipeURL;
      delete user.savedRecipes.recipeKey;
      user.save();
    })
}

UserSchema.statics.addIngredient = (args) => {
  const User = mongoose.model('users');

  User.findById(args[userId])
    .then(user => {
      delete args.userId;
      user.savedIngredients[args.name] = args;
      user.save();
    })
}

UserSchema.statics.removeIngredient = (args) => {
  const User = mongoose.model('users');

  User.findById(args[userId])
    .then(user => {
      let ingredientKey = args.name;
      delete user.savedRecipes.ingredientKey;
      user.save();
    })
}

module.exports = mongoose.model("users", UserSchema);
