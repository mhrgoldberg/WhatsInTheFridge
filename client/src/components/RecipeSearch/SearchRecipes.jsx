import React from 'react';
import SearchRecipeItem from './SearchRecipeItem';

const SearchRecipes = props => {
  console.log(props.recipes);
  debugger;
  return <div>
    {props.recipes.map((recipe, i) => {
      console.log(recipe);
      console.log(recipe.recipe.label);
      console.log(recipe.recipe.url);
      console.log(recipe.recipe.uri);
      console.log(recipe.recipe.image);
      console.log(recipe.recipe.ingredientLines);
      console.log(recipe.recipe.calories);
      console.log(recipe.recipe.yield);
      console.log(recipe.recipe.digest[0].total);
      console.log(recipe.recipe.digest[0].daily);
      console.log(recipe.recipe.digest[1].total);
      console.log(recipe.recipe.digest[1].daily);
      console.log(recipe.recipe.digest[2].total);
      console.log(recipe.recipe.digest[2].daily);

      return <SearchRecipeItem key={i} recipe={recipe} currentUserId={props.currentUserId}/>
    })}
    <div>
      {props.error}
    </div>
  </div>
 
};

export default SearchRecipes;