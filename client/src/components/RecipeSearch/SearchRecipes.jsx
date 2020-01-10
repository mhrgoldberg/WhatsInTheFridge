import React from "react";
import SearchRecipeItem from "./SearchRecipeItem";

const SearchRecipes = props => {
  return (
    <div className="search-recipes-list">
      {props.recipes.map((recipe, i) => {

        return (
          <SearchRecipeItem
            key={i}
            recipe={recipe}
            currentUserId={props.currentUserId}
          />
        );
      })}
      <div>{props.error}</div>
    </div>
  );
};

export default SearchRecipes;
