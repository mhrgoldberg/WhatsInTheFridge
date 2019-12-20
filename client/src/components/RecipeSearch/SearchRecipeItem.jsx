import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import mutations from '../../graphql/mutations';
const { SAVE_RECIPE } = mutations;

class SearchRecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.recipe.recipe.label,
      recipeURL: this.props.recipe.recipe.url,
      imageURL: this.props.recipe.recipe.image,
      ingredients: this.props.recipe.recipe.ingredientLines,
      calories: this.props.recipe.recipe.calories,
      servings: this.props.recipe.recipe.yield,
      carbsTotal: this.props.recipe.recipe.digest[0].total,
      carbsDaily: this.props.recipe.recipe.digest[0].daily,
      fatsTotal: this.props.recipe.recipe.digest[1].total,
      fatsDaily: this.props.recipe.recipe.digest[1].daily,
      proteinTotal: this.props.recipe.recipe.digest[2].total,
      proteinDaily: this.props.recipe.recipe.digest[2].daily,
      userId: this.props.currentUserId
    }
  }

  render() {
    debugger;
    return (
      <div key={this.props.key}>
        <p>{this.props.recipe.recipe.label}</p>
        <img src={this.props.recipe.recipe.image} />
        <ul>Ingredients
                  {this.props.recipe.recipe.ingredients.map((ingredient, i) => {
          return (<li key={i}>{ingredient.text}</li>)
        })}
        </ul>
        <Mutation mutation={SAVE_RECIPE}>
          {(saveRecipe, { data }) => (
            <button onClick={() => {
              saveRecipe({ variables: this.state })
              .then(recipe => console.log(recipe))
              .catch(err => console.log(err))
            }}>Save Recipe</button>
          )}
        </Mutation>
      </div>
    )
  }
};

export default SearchRecipeItem;