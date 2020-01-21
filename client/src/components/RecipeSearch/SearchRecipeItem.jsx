import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import mutations from '../../graphql/mutations';
import Modal from "../Modal.jsx";
import Backdrop from "../Backdrop.jsx";
import NutritionPieChart from "../nutrition_pie_chart";
import NutritionBarChart from '../nutrition_bar_chart';
const { SAVE_RECIPE } = mutations;


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
        carbsDaily: this.props.recipe.recipe.digest[0].daily,
        fatsTotal: this.props.recipe.recipe.digest[1].total,
        fatsDaily: this.props.recipe.recipe.digest[1].daily,
        proteinTotal: this.props.recipe.recipe.digest[2].total,
        proteinDaily: this.props.recipe.recipe.digest[2].daily,
        userId: this.props.currentUserId
      },
      ingredientsPullUp: false,
      healthPullUp: false 
    }
  }

  startModalHandler = () => {
    this.setState({ ingredientsPullUp: true });
  }

  modalCancelHandler = () => {
    this.setState({ ingredientsPullUp: false, healthPullUp: false });
  }

  startHealthHandler = () => {
    this.setState({ healthPullUp: true })
  }

  render() {
    let dailyCarbs = (this.props.recipe.recipe.digest[0].total * this.props.recipe.recipe.digest[0].daily);
    let dailyFats = (this.props.recipe.recipe.digest[1].total * this.props.recipe.recipe.digest[1].daily);
    let dailyProteins = (this.props.recipe.recipe.digest[2].total * this.props.recipe.recipe.digest[2].daily);

    let savedButton; 

    if (this.props.saved === true ) {
      savedButton = <button id="sr-save-recipe-btn">
        Recipe Saved
      </button>
    } else {
      savedButton = <Mutation mutation={SAVE_RECIPE}>
        {(saveRecipe, { data }) => (
          <button id="sr-save-recipe-btn" onClick={() => {
            saveRecipe({ variables: this.state.variables })
              .then(recipe => console.log(recipe))
              .catch(err => console.log(err))
          }}>Save Recipe</button>
        )}
      </Mutation>
    }

    return (
      <div className="search-result" key={this.props.key}>
        <div className="search-result-info">
          <div className="search-result-title">
            <h4>{this.props.recipe.recipe.label}</h4>
          </div>
          <div className="search-result-buttons">
            <div>
              {savedButton}
            </div>
            <a href={this.props.recipe.recipe.url}><button>Link to Recipe</button></a>
            <React.Fragment>
              {this.state.ingredientsPullUp && <Backdrop canCancel onCancel={this.modalCancelHandler} />}
              {this.state.ingredientsPullUp && (
                <Modal
                  title="Ingredients"
                  canCancel
                  canConfirm
                  onCancel={this.modalCancelHandler}
                  onConfirm={this.startModalHandler}
                  // children={}
                  submit="Ingredients"
                >
                  <ul className="ingredient-modal">
                      {this.props.recipe.recipe.ingredients.map((ingredient, i) => {
                    return (<li key={i}>{ingredient.text}</li>)
                  })}
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
              {this.state.healthPullUp && <Backdrop canCancel onCancel={this.modalCancelHandler} />}
              {this.state.healthPullUp && (
                <Modal
                  title="Health Facts"
                  canCancel
                  canConfirm
                  onCancel={this.modalCancelHandler}
                  onConfirm={this.startHealthHandler}
                  // children={}
                  submit="Health"
                >
                  <ul className="health-modal">
                    <li>Calories: {this.props.recipe.recipe.calories.toFixed(0)}</li>
                    <li>Servings: {this.props.recipe.recipe.yield}</li>
                    {/* <li>Total Carbs: {this.props.recipe.recipe.digest[0].total}</li>
                    <li>Daily Carbs: {this.props.recipe.recipe.digest[0].daily}</li>
                    <li>Total Fats: {this.props.recipe.recipe.digest[1].total}</li>
                    <li>Daily Fats: {this.props.recipe.recipe.digest[1].daily}</li>
                    <li>Total Protein: {this.props.recipe.recipe.digest[2].total}</li>
                    <li>Daily Protein: {this.props.recipe.recipe.digest[2].daily}</li>    */}
                  </ul>
                  {/* <NutritionBarChart carbs={this.props.recipe.recipe.digest[0].total} dailyCarbs={dailyCarbs} proteins={this.props.recipe.recipe.digest[1].total} dailyProteins={dailyProteins} fats={this.props.recipe.recipe.digest[2].total} dailyFats={dailyFats} /> */}
                  <NutritionPieChart carb={this.props.recipe.recipe.digest[0].total.toFixed(2)} protein={this.props.recipe.recipe.digest[1].total.toFixed(2)} fat={this.props.recipe.recipe.digest[2].total.toFixed(2)} />
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
    )
  }
};

export default SearchRecipeItem;