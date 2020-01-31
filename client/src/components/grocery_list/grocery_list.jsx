import React from "react";
import { Query } from "react-apollo";
import NutritionPieChart from "../nutrition_pie_chart";
import queries from '../../graphql/queries';
const { GET_CURRENT_USER_INGREDIENTS } = queries;

const GroceryList = ({ currentUserId }) => (
  <ul className="GroceryList">
     <Query query={GET_CURRENT_USER_INGREDIENTS} variables={{ id: currentUserId }}>
      {({ loading, error, data }) => {
        if (loading) return <li>Loading...</li>
        if (error) return <li>Error</li>
        console.log(data.user.savedIngredients);
        let ingredientArr = data.user.savedIngredients;
        if (ingredientArr.length === 0) return <li>Empty!</li>
        ingredientArr.forEach(ingredient => {
          return (
            <li>
              <div className="ingredient-item">
                <div className="ingredient-quantity">
                  {ingredient.quantity} {ingredient.measureLabel}
                </div>
                <div className="ingredient-string">{ingredient.name}</div>
                <div className="ingredient-chart">
                  <button id="ingredient-nutrition-button">Health Facts</button>
                  {/* <NutritionPieChart carbs={ingredient.carbsTotal} proteins={ingredient.proteinTotal} fats={ingredient.fatsTotal} /> */}
                </div>
              </div>
            </li>
          )
        })
      }}
    </Query>
  </ul>
);

export default GroceryList;
