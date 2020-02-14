import React, { Component } from "react";
import { Mutation } from "react-apollo";
// import { Link } from "react-router-dom";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
import Modal from "../Modal.jsx";
import Backdrop from "../Backdrop.jsx";
import NutritionPieChart from "../nutrition_pie_chart";
// import NutritionBarChart from "../nutrition_bar_chart";
// import Fridge from "../fridge/fridge";
const { SAVE_RECIPE, SAVE_INGREDIENT } = mutations;
const { GET_CURRENT_USER_INGREDIENTS, GET_CURRENT_USER_RECIPES } = queries;

class SearchRecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variables: {
        name: this.props.recipe.recipe.label,
        recipeURL: this.props.recipe.recipe.url,
        imageURL: this.props.recipe.recipe.image,
        ingredients: this.props.recipe.recipe.ingredientLines,
        calories: this.props.recipe.recipe.calories,
        servings: this.props.recipe.recipe.yield,
        carbsTotal: this.props.recipe.recipe.digest[0].total,
        fatsTotal: this.props.recipe.recipe.digest[1].total,
        proteinTotal: this.props.recipe.recipe.digest[2].total,
        userId: this.props.currentUserId
      },
      saved: this.props.saved,
      ingredientsPullUp: false,
      healthPullUp: false
    };
    this.parseMultipleIngredients = this.parseMultipleIngredients.bind(this);
  }

  startModalHandler = () => {
    this.setState({ ingredientsPullUp: true });
  };

  modalCancelHandler = () => {
    this.setState({ ingredientsPullUp: false, healthPullUp: false });
  };

  startHealthHandler = () => {
    this.setState({ healthPullUp: true });
  };

  parseMultipleIngredients = async ingredientLines => {
  
    const res = []; 
    for (let i = 0; i < ingredientLines.length; i++) {
      const ingredient = ingredientLines[i];
      const ing = await this.parseIngredient(ingredient);
      const ingredientArr = ingredient.split(" ");
      if (
        !this.props.fridgeArr.some(fridgeIngredient =>
          ingredientArr.includes(fridgeIngredient)
        )
      ) {
         res.push(ing);
      }
    }
    return res;
  };

  parseIngredient = async ingredient => {
    const ingredientText = ingredient.split(" ").join("%20");
    const apiCall = await fetch(
      `https://api.edamam.com/api/food-database/parser?ingr=${ingredientText}&app_id=abcacee6&app_key=7f1529c466e340c215eea57a940d63c6`
    );
    const data = await apiCall.json();

    const dataParsed = {
      name: data.parsed[0].food.label || "",
      quantity: data.parsed[0].quantity || 0,
      measureLabel: data.parsed[0].measure.label || "",
      calories: data.parsed[0].food.nutrients.ENERC_KCAL || 0,
      userId: this.props.currentUserId
    };
    return dataParsed;
  };


  render() {
    let savedButton;

    if (this.state.saved === true) {
      savedButton = <button id="sr-save-recipe-btn">Recipe Saved</button>;
    } else {
      savedButton = (
        <Mutation mutation={SAVE_RECIPE}>
          {(saveRecipe, { data }) => (
            <Mutation mutation={SAVE_INGREDIENT}
            refetchQueries={() => {
              return [{
                 query: GET_CURRENT_USER_INGREDIENTS,
                 variables: { id: this.props.currentUserId }
              }];
            }}>
              {(saveIngredient, { data } ) => (
                <button
                  id="sr-save-recipe-btn"
                  onClick={() => {
                    saveRecipe({ variables: this.state.variables, 
                      refetchQueries: [{query: GET_CURRENT_USER_RECIPES, variables: { id: this.props.currentUserId }}] })
                      .then(recipe => { return this.parseMultipleIngredients(recipe.data.saveRecipe.ingredients)})
                      .then(ingredients => {
                        ingredients.forEach(ingredient => (
                        saveIngredient({variables: ingredient})
                      ))})  
                      .then(() => this.setState({ saved: true }))
                      .catch(err => console.log(err));
                  }}
                >
                  Save Recipe
                </button>
              )
              }
            </Mutation>
          )}
        </Mutation>
      );
    }

    return (
      <div className="search-result" key={this.props.key}>
        <div className="search-result-info">
          <div className="search-result-title">
            <h4>{this.props.recipe.recipe.label}</h4>
          </div>
          <div className="search-result-buttons">
            <div>{savedButton}</div>
            <a href={this.props.recipe.recipe.url} target="_blank">
              <button>Link to Recipe</button>
            </a>
            <React.Fragment>
              {this.state.ingredientsPullUp && (
                <Backdrop canCancel onCancel={this.modalCancelHandler} />
              )}
              {this.state.ingredientsPullUp && (
                <Modal
                  title="Ingredients"
                  canCancel
                  canConfirm
                  onCancel={this.modalCancelHandler}
                  onConfirm={this.startModalHandler}
                  submit="Ingredients"
                >
                  <ul className="ingredient-modal">
                    {this.props.recipe.recipe.ingredients.map(
                      (ingredient, i) => {
                        return <li key={i}>{ingredient.text}</li>;
                      }
                    )}
                  </ul>
                </Modal>
              )}
              <div className="modal-control">
                <button
                  id="sr-modal-button"
                  className="btn"
                  onClick={this.startModalHandler}
                >
                  Ingredients
                </button>
              </div>
            </React.Fragment>
            <React.Fragment>
              {this.state.healthPullUp && (
                <Backdrop canCancel onCancel={this.modalCancelHandler} />
              )}
              {this.state.healthPullUp && (
                <Modal
                  title="Health Facts"
                  canCancel
                  canConfirm
                  onCancel={this.modalCancelHandler}
                  onConfirm={this.startHealthHandler}
                  submit="Health"
                >
                  <ul className="health-modal">
                    <li>
                      Calories: {this.props.recipe.recipe.calories.toFixed(0)}
                    </li>
                    <li>Servings: {this.props.recipe.recipe.yield}</li>
                  </ul>
                  <NutritionPieChart
                    carb={this.props.recipe.recipe.digest[0].total.toFixed(2)}
                    protein={this.props.recipe.recipe.digest[1].total.toFixed(
                      2
                    )}
                    fat={this.props.recipe.recipe.digest[2].total.toFixed(2)}
                  />
                </Modal>
              )}
              <div className="modal-control">
                <button
                  className="btn"
                  id="sr-modal-button"
                  onClick={this.startHealthHandler}
                >
                  Health Facts
                </button>
              </div>
            </React.Fragment>
          </div>
        </div>
        <div className="recipe-pic">
          <img src={this.props.recipe.recipe.image} />
        </div>
      </div>
    );
  }
}

export default SearchRecipeItem;
