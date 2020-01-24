import React from "react";
import SearchRecipeItem from "./SearchRecipeItem";

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Queries from "../../graphql/queries";

const { GET_CURRENT_USER_RECIPES } = Queries;



const SearchRecipes = props => {
  const recipeURLS = [];
  return <div className="search-recipes-list">
    <Query query={GET_CURRENT_USER_RECIPES} variables={{ id: props.currentUserId }}>
      {({ loading, error, data }) => {

        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const recipes = data.user.savedRecipes;
        console.log(recipes)
        recipes.map((recipe, i) => (
          recipeURLS[i] = recipe.recipeURL
        ))
        console.log(props.recipes);
        return <div>
          {props.recipes.map((recipe, i) => {
           
            if (recipeURLS.includes(recipe.recipe.url)) {
              return <div>
              <SearchRecipeItem key={i} fridgeArr={props.fridgeArr} recipe={recipe} currentUserId={props.currentUserId} saved={true} />
              </div>
            } else {
              return <SearchRecipeItem key={i} fridgeArr={props.fridgeArr} recipe={recipe} currentUserId={props.currentUserId} saved={false} />
            }
          })} 
          <div>
            {props.error}
          </div>
        </div>
      }}
    </Query>
    </div>
}; 

export default SearchRecipes;
