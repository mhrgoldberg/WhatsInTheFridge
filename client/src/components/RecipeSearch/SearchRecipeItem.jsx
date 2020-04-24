import React, { Component } from "react";
import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
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
      saving: false,
    };
    this.parseMultipleIngredients = this.parseMultipleIngredients.bind(this);
  }

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
    if (data.parsed) {
      const parsed = data.parsed[0];
      if (Boolean(parsed)) {
        // need condition that will retry if it does not get the correct result back
        const dataParsed = {
          name: Boolean(parsed.food) ? parsed.food.label : "",
          quantity: Boolean(parsed.quantity) ? parsed.quantity : 1,
          measureLabel: Boolean(parsed.measure) ? parsed.measure.label : "",
          calories: Boolean(parsed.food.nutrients.ENERC_KCAL)
            ? parsed.food.nutrients.ENERC_KCAL
            : 0,
          userId: this.props.currentUserId
        };
        return dataParsed;
      }
    }
    if (data.text) {
      return {
        name: data.text,
        quantity: 1,
        measureLabel: "",
        calories: 0,
        userId: this.props.currentUserId
      };
    }
  };

  render() {
    let savedButton;
    const {
      openIngredientModal,
      openHealthFactsModal,
    } = this.props;

    if (this.state.saved === true) {
      savedButton = <h5 className="saved">Recipe Saved <i className="fas fa-bookmark"></i></h5>;
    } else if (this.state.saving) {
      savedButton = <h5 className="saved">adding ingredients to grocery list...</h5>;
    } else {
      savedButton = (
        <Mutation mutation={SAVE_RECIPE}>
          {(saveRecipe, { loading, error }) => (
            <Mutation
              mutation={SAVE_INGREDIENT}
              refetchQueries={() => {
                return [
                  {
                    query: GET_CURRENT_USER_INGREDIENTS,
                    variables: { id: this.props.currentUserId }
                  }
                ];
              }}
            >
              {/* {error && <p>Error :( Please try again</p>} */}
              {(saveIngredient, { loading, error }) => (
                <button
                  id="sr-save-recipe-btn"
                  onClick={() => {
                    this.setState({ saving: true });
                    saveRecipe({
                      variables: this.state.variables,
                      refetchQueries: [
                        {
                          query: GET_CURRENT_USER_RECIPES,
                          variables: { id: this.props.currentUserId }
                        }
                      ]
                    })
                      // .catch(err => console.log(err))
                      .then(recipe => {
                        return this.parseMultipleIngredients(
                          recipe.data.saveRecipe.ingredients
                        );
                      })
                      .then(ingredients => {
                        ingredients.forEach(
                          async ingredient =>
                            await saveIngredient({ variables: ingredient })
                        );
                      })
                      // .catch(err => console.log(err))
                      .then(() =>
                        this.setState({ saving: false, saved: true })
                      );
                  }}
                >
                  Save Recipe <i className="far fa-bookmark"></i>
                </button>
              )}
            </Mutation>
          )}
        </Mutation>
      );
    }

    return (
      <div className="search-result">
        <div className="search-result-info">
          <div className="search-result-title">
            <h4>{this.props.recipe.recipe.label}</h4>
          </div>
          <div className="search-result-buttons">
            <div>{savedButton}</div>
            <a href={this.props.recipe.recipe.url} target="_blank" rel="noopener noreferrer">
              <button>Full Recipe <i className="fas fa-external-link-alt"></i></button>
            </a>
            <React.Fragment>
              <div className="modal-control">
                <button
                  id="sr-modal-button"
                  className="btn"
                  onClick={() => {openIngredientModal(this.props.recipe.recipe.ingredientLines)}}
                >
                  Ingredients <i className="fas fa-list-ul"></i>
                </button>
              </div>
            </React.Fragment>
            <React.Fragment>
             
              <div className="modal-control">
                <button
                  className="btn"
                  id="sr-modal-button"
                  onClick={() =>
                    openHealthFactsModal({
                      carb: this.props.recipe.recipe.digest[0].total.toFixed(2),
                      protein: this.props.recipe.recipe.digest[1].total.toFixed(
                        2
                      ),
                      fat: this.props.recipe.recipe.digest[2].total.toFixed(2),
                      calories: this.props.recipe.recipe.calories.toFixed(0),
                      servings: this.props.recipe.recipe.yield

                    })
                  }
                >
                  Health Data <i className="fas fa-chart-pie"></i>
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
