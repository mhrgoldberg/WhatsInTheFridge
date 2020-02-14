import React from "react";
import { Query, Mutation } from "react-apollo";
// import NutritionPieChart from "../nutrition_pie_chart";
import queries from "../../graphql/queries";
import mutations from "../../graphql/mutations";
import Loading from "../loading";

const { GET_CURRENT_USER_INGREDIENTS } = queries;
const { REMOVE_INGREDIENT } = mutations;

class GroceryList extends React.Component {
  render() {
    return (
     
        <Query
          query={GET_CURRENT_USER_INGREDIENTS}
          variables={{ id: this.props.currentUserId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <li>Error</li>;
            console.log(data.user.savedIngredients);
            let ingredientArr = data.user.savedIngredients;
            if (ingredientArr.length === 0) return <li>Empty!</li>;
            return  <ul id="grocery-list">
            {ingredientArr.map((ingredient, i) => {
              return (
                <li>
                  <div className="ingredient-item">
                    <div>
                    <div className="ingredient-quantity">
                      {ingredient.quantity} {ingredient.measureLabel}
                    </div>
                    <div className="ingredient-string">{ingredient.name}</div>
                    </div>
                    {/* <div className="ingredient-chart"> */}
                      {/* <button id="ingredient-nutrition-button">Health Facts</button> */}
                      {/* <NutritionPieChart carbs={ingredient.carbsTotal} proteins={ingredient.proteinTotal} fats={ingredient.fatsTotal} /> */}
                    {/* </div> */}
                    <Mutation mutation={REMOVE_INGREDIENT}
                      refetchQueries={() => {
                        return [{
                          query: GET_CURRENT_USER_INGREDIENTS,
                          variables: { id: this.props.currentUserId }
                        }];
                      }}
                      >
                      {(removeIngredient) => (
                      <button className="delete-ingredient"
                          onClick={() => {
                            console.log(this.props.currentUserId);
                            console.log(ingredient.name);
                            removeIngredient({
                              variables: {
                                userId: this.props.currentUserId,
                                name: ingredient.name 
                              }
                            }).catch((err => {
                              console.log(err);
                            }))
                          }}
                        >
                        x</button>
                      )}
                    </Mutation>
                   
                  </div>
                </li>
              );
            })}
            </ul>
          }}
        </Query>

    );
  }
}

export default GroceryList;
