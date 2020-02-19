import React, { Component } from "react";

import SearchAdvancedForm from "./SearchAdvancedForm";
import SearchRecipes from "./SearchRecipes";
import { ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import { SyncLoader } from "react-spinners";
const { VERIFY_USER } = mutations;
const { CURRENT_USER } = queries;
const API_KEY = require("../../api_keys.js").RECIPE_API_KEY;
const API_ID = require("../../api_keys.js").RECIPE_API_ID;

class SearchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      error: "",
      currentUserId: null,
      loading: true,
      spinner: false,
      advancedOptions: false,
      searchOptions: {
        calMin: "",
        calMax: "",
        timeMin: "",
        timeMax: "",
        exclude1: "",
        exclude2: "",
        exclude3: "",
        exclude4: "",
        dietString: "",
        dietChoice: "",
        maxIngredients: 10,
        alcoholFree: false,
        peanutFree: false,
        sugarConscious: false,
        treeNutFree: false
      }
    };
    this.updateSearchAdvancedState = this.updateSearchAdvancedState.bind(this);
  }

  updateSearchAdvancedState(value, name) {
    const searchOptions = { ...this.state.searchOptions };
    searchOptions[name] = value;
    this.setState({ searchOptions });
  }

  getRecipe = async payload => {
    const recipeName2 = this.props.fridgeArr.join(", ");
    const num_ingredients = payload.maxIngredients;
    let dietString = "";
    let healthString = "";
    let dishString = "";
    let calMin = payload.calMin;
    let calMax = payload.calMax;
    let calString = "";
    let timeMin = payload.timeMin;
    let timeMax = payload.timeMax;
    let timeString = "";
    let excludeString = "";

    let excludeVal1 = payload.exclude1;
    let excludeVal2 = payload.exclude2;
    let excludeVal3 = payload.exclude3;
    let excludeVal4 = payload.exclude4;

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

    let dietChoice = payload.dietChoice;

    if (dietChoice !== "") {
      dietString = "&diet=" + dietChoice;
    } else {
      dietString = dietChoice;
    }

    let healthChoices = [
      payload.alcoholFree,
      payload.peanutFree,
      payload.sugarConscious,
      payload.treeNutFree
    ];

    let healthValues = [
      "alcohol-free",
      "peanut-free",
      "sugar-conscious",
      "tree-nut-free"
    ];

    healthChoices.map((choice, i) => {
      if (choice) {
        healthString += "&health=" + `${healthValues[i]}`;
      } else {
        healthString += "";
      }
    });

    try {
      const api_call = await fetch(
        `https://api.edamam.com/search?q=${recipeName2}&app_id=${API_ID}&app_key=${API_KEY}&from=${0}&to=${50}&ingr=${num_ingredients}${dietString}${healthString}${dishString}${calString}${timeString}${excludeString}`
      );  
      const data = await api_call.json();
      const parsedData = this.checkRecipeArr(data.hits);
      this.setState({ recipes: parsedData, spinner: false });
    } catch (err) {
      this.setState({ error: "No results found" });
    }
  };

  checkRecipeArr = recipesArr => {
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
        }
      }
      if (!valid) return false;
    }
    return true;
  };

  render() {
    let instructions = (
      <React.Fragment>
        <div className="instructions-form">
          <div className="fridge-instructions-2">
            <ul id="instructions-list">
              <li> HOW TO GET STARTED </li>
              <li>1. Add food items to Fridge List</li>
              <li>2. Select any advanced search options below(optional)</li>
              <li>3. Search for tonights dinner with one click of a button</li>
              <li>
                4. Save a recipe, items you need to get for the recipe will be
                added to your grocery list
              </li>
            </ul>
          </div>
          <div className="counter-image" />
        </div>
      </React.Fragment>
    );

    let form = (
      <React.Fragment>
        <SearchAdvancedForm
          updateSearchAdvancedState={this.updateSearchAdvancedState}
          searchOptions={this.state.searchOptions}
          getRecipe={this.getRecipe}
        />
      </React.Fragment>
    );

    if (!this.state.advancedOptions) {
      form = null;
    }
    let searchResult;

    if (this.state.recipes.length > 0) {
      // this.setState({ advancedOptions: false });
      instructions = null;
      searchResult = (
        <SearchRecipes
          fridgeArr={this.props.fridgeArr}
          recipes={this.state.recipes}
          currentUserId={this.state.currentUserId}
          error={this.state.error}
        />
      );
    }

    let button = (
      <button
        className="as-search-btn"
        onClick={() => {
          this.setState({ advancedOptions: false, spinner: true });
          this.getRecipe(this.state.searchOptions);
        }}
      >
        Search
      </button>
    );

    if (this.state.spinner) {
      button = (
        <div className="as-search-btn-loading">
          <SyncLoader color={"white"} size={10} />
        </div>
      );
    }

    let advancedSearchToggle = (
      <h2
        onClick={() =>
          this.setState({
            advancedOptions: !this.state.advancedOptions
          })
        }
      >
        <i className="fas fa-caret-right"></i> Advanced Search Options
      </h2>
    );

    if (this.state.advancedOptions === true) {
      searchResult = null;
      advancedSearchToggle = (
        <h2
          onClick={() =>
            this.setState({
              advancedOptions: !this.state.advancedOptions
            })
          }
        >
          <i className="fas fa-caret-down"></i> Advanced Search Options
        </h2>
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
              {instructions}
              <div className="search-bar">
                {advancedSearchToggle}
                {button}
              </div>
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
