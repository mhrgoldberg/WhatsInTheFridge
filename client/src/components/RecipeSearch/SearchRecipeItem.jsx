import React from 'react';
import {Mutation} from 'react-apollo';

const SearchRecipeItem = props => {
  console.log(props.recipe);
  let name = props.recipe.recipe.label;
  console.log(props.recipe.recipe.label);

  let recipeURL = props.recipe.recipe.url;
  console.log(props.recipe.recipe.url);
  console.log(props.recipe.recipe.uri);

  let imageURL = props.recipe.recipe.image;
  console.log(props.recipe.recipe.image);

  let ingredients = props.recipe.recipe.ingredientLines;
  console.log(props.recipe.recipe.ingredientLines);

  let calories = props.recipe.recipe.calories;
  console.log(props.recipe.recipe.calories);

  let servings = props.recipe.recipe.yield;
  console.log(props.recipe.recipe.yield);

  let macros = {carbs: {}, fats: {}, proteins: {}};

  macros[carbs] = { total: props.recipe.recipe.digest[0].total, daily: props.recipe.recipe.digest[0].daily};
  console.log(props.recipe.recipe.digest[0].total);
  console.log(props.recipe.recipe.digest[0].daily);

  macros[fats] = { total: props.recipe.recipe.digest[1].total, daily: props.recipe.recipe.digest[1].daily };
  console.log(props.recipe.recipe.digest[1].total);
  console.log(props.recipe.recipe.digest[1].daily);

  macros[proteins] = { total: props.recipe.recipe.digest[2].total, daily: props.recipe.recipe.digest[2].daily };
  console.log(props.recipe.recipe.digest[2].total);
  console.log(props.recipe.recipe.digest[2].daily);

  console.log(macros);

  return (<div key={props.key}>
    <p>{props.recipe.recipe.label}</p>
    <img src={props.recipe.recipe.image} />
    <ul>Ingredients
              {props.recipe.recipe.ingredients.map((ingredient, i) => {
      return (<li key={i}>{ingredient.text}</li>)
    })}
    </ul>
    {/* <button onClick={}>Save Recipe</button> */}
  </div>)
}; 



export default SearchRecipeItem;