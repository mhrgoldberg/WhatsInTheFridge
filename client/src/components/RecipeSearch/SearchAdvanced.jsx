import React, { Component } from "react";

import SearchAdvancedForm from "./SearchAdvancedForm";
import SearchRecipes from "./SearchRecipes";
import { ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
const { VERIFY_USER } = mutations;
const { CURRENT_USER } = queries;
const API_KEY = require("../../api_keys.js").RECIPE_API_KEY;
const API_ID = require("../../api_keys.js").RECIPE_API_ID;

class SearchAdvanced extends Component {
  state = {
    recipes: [],
    error: "",
    currentUserId: null,
    loading: true
  };

  getRecipe = async e => {
    // console.log(e.target.elements);
    const recipeName2 = this.props.fridgeArr.join(", ");
    const num_ingredients = e.target.elements.num_ingredients.value;
    let dietString = "";
    let healthString = "";
    let cuisineString = "";
    let mealString = "";
    let dishString = "";
    let calMin = e.target.elements.caloriesMin.value;
    let calMax = e.target.elements.caloriesMax.value;
    let calString = "";
    let timeMin = e.target.elements.timeMin.value;
    let timeMax = e.target.elements.timeMax.value;
    let timeString = "";
    let excludeString = "";

    let excludeVal1 = e.target.elements.exclude1.value;
    let excludeVal2 = e.target.elements.exclude2.value;
    let excludeVal3 = e.target.elements.exclude3.value;
    let excludeVal4 = e.target.elements.exclude4.value;

    if (excludeVal1 !== "") {
      excludeString += "&excluded=" + excludeVal1;
    }
    if (excludeVal2 !== "") {
      excludeString += "&excluded=" + excludeVal2;
    }
    if (excludeVal3 !== "") {
      excludeString += "&excluded=" + excludeVal3;
    }
    if (excludeVal3 !== "") {
      excludeString += "&excluded=" + excludeVal4;
    }

    if (calMin === "" && calMax === "") {
      calString = "";
    } else if (calMin > calMax) {
      calString = "&calories=" + calMin + "%2B";
    } else if (calMin === "" || calMin === "0") {
      calString = "&calories=" + calMax;
    } else if (calMin < calMax) {
      calString = "&calories=" + calMin + "-" + calMax;
    } else {
      calString = "";
    }

    if (timeMin === "" && timeMax === "") {
      timeString = "";
    } else if (timeMin > timeMax) {
      timeString = "&time=" + timeMin + "%2B";
    } else if (timeMin === "" || timeMin === "0") {
      timeString = "&time=" + timeMax;
    } else if (timeMin < timeMax) {
      timeString = "&time=" + timeMin + "-" + timeMax;
    } else {
      timeString = "";
    }

    let dietChoice = e.target.elements.diet.value;

    if (dietChoice !== "") {
      dietString = "&diet=" + dietChoice;
    } else {
      dietString = dietChoice;
    }

    let healthChoices = [];

    for (let i = 0; i < 5; i++) {
      healthChoices[i] = e.target.elements[i + 5];
    }

    healthChoices.map((choice, i) => {
      if (choice.checked) {
        healthString += "&health=" + choice.value;
      } else {
        healthString += "";
      }
    });



    e.preventDefault();
    try {
      const api_call = await fetch(
        `https://api.edamam.com/search?q=${recipeName2}&app_id=${API_ID}&app_key=${API_KEY}&from=${0}&to=${50}&ingr=${num_ingredients}${dietString}${healthString}${cuisineString}${mealString}${dishString}${calString}${timeString}${excludeString}`
      );
      const data = await api_call.json();
      const parsedData = this.checkRecipeArr(data.hits);
      this.setState({ recipes: parsedData });
    } catch (err) {
      this.setState({ error: "No results found" });
    }
  };


  checkRecipeArr = recipesArr => {
    console.log("sort")
    let validRecipes = [];
    recipesArr.forEach(recipe => {
      if (this.checkFridge(recipe)) validRecipes.push(recipe);
    });
    return validRecipes;
  };

  checkFridge = recipe => {
    for (let i = 0; i < this.props.fridgeArr.length; i++) {
      const fridgeIngredient = this.props.fridgeArr[i];
      let valid = false;
      for (let j = 0; j < recipe.recipe.ingredientLines.length; j++) {
        const ingredientString = recipe.recipe.ingredientLines[j];
        if (ingredientString.includes(fridgeIngredient)) {
          valid = true;
          break;
        };
      }
      if (!valid) return false;
    }
    return true;
  };


  render() {
    let form = <React.Fragment>
      <div className="fridge-instructions-2">
        <p>
        Add up to 4 items to your Fridge List to the left, then we will find
        tonight's dinner using ingredients you already have! If you don't have
        an ingredient in the recipe we will add it to your grocery list.
      </p>
    </div>
      <SearchAdvancedForm getRecipe={this.getRecipe} />
    </React.Fragment>;
    let searchResult;

    if (this.state.recipes.length > 0) {
      form = <div></div>;
      searchResult = (
        <SearchRecipes
          recipes={this.state.recipes}
          currentUserId={this.state.currentUserId}
          error={this.state.error}
          fridgeArr={this.props.fridgeArr}
        />
      );
    }
    return (
      <ApolloConsumer>
        {client => {
          if (!this.state.currentUserId) {
            client.query({ query: CURRENT_USER }).then(data => {
              this.setState({
                currentUserId: data.data.currentUser,
                loading: false
              });
            });
          }
          if (this.state.loading) return <h2>Loading...</h2>;
          return (
            <div className="Search">
              <header className="Search-header"></header>
              {form}
              {searchResult}
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default SearchAdvanced;
