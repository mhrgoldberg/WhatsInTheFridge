import React, { Component } from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import SearchForm from "./SearchForm";
import SearchRecipes from "./SearchRecipes";
const { VERIFY_USER } = mutations;
const { CURRENT_USER } = queries;
const API_KEY = require("../../api_keys.js").RECIPE_API_KEY;
const API_ID = require("../../api_keys.js").RECIPE_API_ID;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentUserId: null,
      loading: true
    };
    this.getRecipe = this.getRecipe.bind(this);
  }

  getRecipe = async e => {
    const recipeName = this.props.fridgeArr.join(", ");
    e.preventDefault();
    const api_call = await fetch(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=30`
    );

    const data = await api_call.json();
    const parsedData = this.checkRecipeArr(data.hits);
    this.setState({ recipes: parsedData });
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
    let searchResult;

    if (this.state.recipes.length > 0) {
      searchResult = (
        <SearchRecipes
          fridgeArr={this.props.fridgeArr}
          recipes={this.state.recipes}
          currentUserId={this.state.currentUserId}
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
              <div className="search-top">
                <SearchForm getRecipe={this.getRecipe} />
              </div>
              <div className="search-bottom">
                {searchResult}
              </div>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
