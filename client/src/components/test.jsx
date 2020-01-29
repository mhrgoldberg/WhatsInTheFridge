import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from "react";
import Queries from "../graphql/queries";

const { CURRENT_USER } = Queries;

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

let userId;
let recipeName = "The Ultimate Burger";

const Test = () => (
  <div>
    <Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        userId = data.currentUser;


        return (
          <div>
           
            <Query query={CURRENT_USER_RECIPES} variables={ {id: userId}}>
              {({ loading, error, data }) => {
                console.log(userId)
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const recipes = data.savedRecipes;
                console.log(recipes);

                const recipeNames = [];
                
                recipes.map((recipe, i) => (
                  recipeNames[i] = recipe.name
                ))

                console.log(recipeNames);
                return <div>
                  
                </div>

              }}
            </Query>
          </div>
        )

      }}
      
    </Query>
  </div>
);

export default Test;
