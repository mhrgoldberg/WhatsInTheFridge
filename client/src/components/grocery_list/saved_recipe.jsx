import React from "react";
import NutritionPieChart from "../nutrition_pie_chart";
import { Mutation } from "react-apollo";
// import { Link } from "react-router-dom";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";

const { REMOVE_RECIPE } = mutations;
const { GET_CURRENT_USER_RECIPES } = queries;


const SavedRecipe = ({ recipe, currentUserId }) => {
  let calories = Math.round(recipe.calories);
  return <li className="saved-recipe-li">

      <div className="left-side">
        <div className="recipe-name">{recipe.name}</div>
        <div className="recipe-info">{calories} Calories</div>
        <div className="recipe-info">{recipe.servings} Servings</div>
        {/* <div className="recipe-url-button"> */}
          <a href={recipe.recipeURL} target="_blank">
            <button>Full Recipe</button>
          </a>
        {/* </div> */}
        <div className="recipe-url-button">
        <Mutation mutation={REMOVE_RECIPE}
        refetchQueries={() => {
          return [{
            query: GET_CURRENT_USER_RECIPES,
            variables: { id: currentUserId }
          }];
        }}>
          {(removeRecipe) => (
            <button
              onClick={() => {
                removeRecipe({
                  variables: {
                    recipeURL: recipe.recipeURL,
                    userId: currentUserId
                  }
                }).catch((err => {
                  console.log(err);
                }))
              }}
            >
              Remove
        </button>
          )}
        </Mutation>
        </div>
      </div>  
      <div className="strong-side">
        <div className="recipe-image">
          <img src={recipe.imageURL} />
        </div>
      </div>
      {/* <div>
        <NutritionPieChart carbs={recipe.carbsTotal} proteins={recipe.proteinTotal} fats={recipe.fatsTotal} />
      </div> */}
    
  </li>

};

export default SavedRecipe;