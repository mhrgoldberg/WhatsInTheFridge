import React from "react";
import { Query, Mutation } from "react-apollo";
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
          let ingredientArr = data.user.savedIngredients;
          if (ingredientArr.length === 0) return <div className="ingredient-string" id="empty">No groceries to buy!</div>;
          return (
            <ul id="grocery-list">
              {ingredientArr.map((ingredient, i) => {
                return (
                  <li key={i}>
                    <div className="ingredient-item">
                      <div>
                        <div className="ingredient-quantity">
                          {ingredient.quantity} {ingredient.measureLabel} | {ingredient.calories} cal
                        </div>
                        <div className="ingredient-string">
                          {ingredient.name}
                        </div>
                      </div>
                      <Mutation
                        mutation={REMOVE_INGREDIENT}
                        refetchQueries={() => {
                          return [
                            {
                              query: GET_CURRENT_USER_INGREDIENTS,
                              variables: { id: this.props.currentUserId }
                            }
                          ];
                        }}
                      >
                        {removeIngredient => (
                          <div
                            className="delete-ingredient"
                            onClick={() => {
                              removeIngredient({
                                variables: {
                                  userId: this.props.currentUserId,
                                  name: ingredient.name
                                }
                              }).catch(err => {
                                console.log(err);
                              });
                            }}
                          >
                          </div>
                        )}
                      </Mutation>
                    </div>
                  </li>
                );
              })}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default GroceryList;
