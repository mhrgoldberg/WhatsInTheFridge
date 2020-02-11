import React from "react";
import { Query } from "react-apollo";
import NutritionPieChart from "../nutrition_pie_chart";
import queries from '../../graphql/queries';
const { GET_CURRENT_USER_RECIPES } = queries;

const SavedRecipesList = ({ currentUserId }) => (
  <ul className="SavedRecipesList">
     <Query query={GET_CURRENT_USER_RECIPES} variables={{ id: currentUserId }}>
      {({ loading, error, data }) => {

        if (loading) return <li>Loading...</li>
        if (error) return <li>Error</li>
        console.log(data.user.savedIngredients);
        let recipeArr = data.user.savedRecipes;
        if (recipeArr.length === 0) return <li>No saved recipes!</li>
        recipeArr.map(recipe => {
          // debugger;
          return (
            <li>
              <div className="recipe-url-button">
                <button>Link to URL</button>
              </div>
              <div className="recipe-info">{recipe.calories} {recipe.servings}</div>
              <div className="recipe-name">{recipe.name}</div>
              <div>
                <NutritionPieChart carbs={recipe.carbsTotal} proteins={recipe.proteinTotal} fats={recipe.fatsTotal} />
              </div>
            </li>
          )
        })
      }}
    </Query>
  </ul>
);

export default SavedRecipesList;