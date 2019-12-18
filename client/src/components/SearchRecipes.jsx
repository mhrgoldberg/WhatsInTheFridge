import React from 'react';

const SearchRecipes = props => {
  return <div>
    {props.recipes.map((recipe, i) => {
      return (<div key={i}>
        <p>{recipe.recipe.label}</p>
        <img src={recipe.recipe.image}/>
        <ul>Ingredients
              {recipe.recipe.ingredients.map((ingredient, i) => {
          return (<li key={i}>{ingredient.text}</li>)
        })}
        </ul>
      </div>)
    })}
    <div>
      {props.error}
    </div>
  </div>
 
};

export default SearchRecipes;