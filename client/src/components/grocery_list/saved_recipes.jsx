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
        let recipeArr = data.user.savedRecipes;

        if (recipeArr.length === 0) return <li id="empty">No saved recipes yet!</li>;


        return <div>
          {recipeArr.map((recipe, i) => {
            return (
              <SavedRecipe key={i} recipe={recipe}  currentUserId={currentUserId} />
            )
          })}
        </div>

        
      }}
    </Query>
);

export default SavedRecipesList;