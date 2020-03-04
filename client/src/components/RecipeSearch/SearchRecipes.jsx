import React from "react";
import SearchRecipeItem from "./SearchRecipeItem";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import Loading from "../loading";

const { GET_CURRENT_USER_RECIPES } = Queries;

const SearchRecipes = props => {
  const recipeNames = [];
  return (
    <div className="search-recipes-list">
      <Query
        query={GET_CURRENT_USER_RECIPES}
        variables={{ id: props.currentUserId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <div>Error</div>;

          const recipes = data.user.savedRecipes;
          recipes.map((recipe, i) => (recipeNames[i] = recipe.name));
          return (
            <div>
              {props.recipes.map((recipe, i) => {
                if (recipeNames.includes(recipe.recipe.label)) {
                  return (
                    <SearchRecipeItem
                      openIngredientModal={props.openIngredientModal}
                      openHealthFactsModal={props.openHealthFactsModal}
                      key={i}
                      fridgeArr={props.fridgeArr}
                      recipe={recipe}
                      currentUserId={props.currentUserId}
                      saved={true}
                    />
                  );
                } else {
                  return (
                    <SearchRecipeItem
                      openIngredientModal={props.openIngredientModal}
                      openHealthFactsModal={props.openHealthFactsModal}
                      key={i}
                      fridgeArr={props.fridgeArr}
                      recipe={recipe}
                      currentUserId={props.currentUserId}
                      saved={false}
                    />
                  );
                }
              })}
              <div>{props.error}</div>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default SearchRecipes;
