import React from "react";
import NutritionPieChart from "../nutrition_pie_chart";

const GroceryList = ({ GroceryListArr }) => (
  <ul className="GroceryList">
    {GroceryListArr.map(ingredient => (
      <li>
        <div className="ingredient-quantity">
          {ingredient.quntity} {ingredient.measure.label}
        </div>
        <div className="ingredient-string">{ingredient.label}</div>
        <div>
          <NutritionPieChart carbs="" proteins="" fats="" />
        </div>
      </li>
    ))}
  </ul>
);

export default GroceryList;
