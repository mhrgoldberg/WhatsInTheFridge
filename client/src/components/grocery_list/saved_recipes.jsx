import React from "react";
import { Query } from "react-apollo";
import NutritionPieChart from "../nutrition_pie_chart";
import queries from '../../graphql/queries';
import SavedRecipe from './saved_recipe';
import Loading from "../loading";
const { GET_CURRENT_USER_RECIPES } = queries;

const SavedRecipesList = ({ currentUserId }) => (
     <Query query={GET_CURRENT_USER_RECIPES} variables={{ id: currentUserId }}>
      {({ loading, error, data }) => {

        if (loading) return <Loading />;
        if (error) return <li>Error</li>
        // console.log(data.user.savedIngredients);
        let recipeArr = data.user.savedRecipes;
        console.log(recipeArr)
        console.log(currentUserId);
        if (recipeArr.length === 0) return <li>No saved recipes!</li>;


        return <div>
          {recipeArr.map(recipe => {
            // debugger;
            return (
              <SavedRecipe recipe={recipe} />
            )
          })}
        </div>

        
      }}
    </Query>
);

export default SavedRecipesList;