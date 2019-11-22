import React from 'react';
import SearchRecipeItem from './SearchRecipeItem';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Queries from "../../graphql/queries";

const CURRENT_USER_RECIPES = gql`
  query savedRecipes ($id: ID!) {
    savedRecipes (_id: $id) {
      _id, 
      name, 
      recipeURL, 
      calories, 
      servings, 
      userId
    }
  }
`;




const SearchRecipes = props => {
  const recipeNames = [];
  
  return <div className="search-recipes-list">
    <Query query={CURRENT_USER_RECIPES} variables={{ id: props.currentUserId }}>
      {({ loading, error, data }) => {

        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const recipes = data.savedRecipes;

        recipes.map((recipe, i) => (
          recipeNames[i] = recipe.name
        ))

        // console.log(recipeNames);
        return <div>
          {props.recipes.map((recipe, i) => {
           
            if (recipeNames.includes(recipe.recipe.label)) {
              // console.log(recipe.recipe.label);
              return <div>
              <SearchRecipeItem key={i} recipe={recipe} currentUserId={props.currentUserId} saved={true} />
              {/* <h1>{recipe.recipe.label}</h1> */}
              </div>
            } else {
              // console.log(recipe.recipe.label);
              return <SearchRecipeItem key={i} recipe={recipe} currentUserId={props.currentUserId} saved={false} />
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