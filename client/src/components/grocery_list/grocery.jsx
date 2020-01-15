import React, { Component } from 'react'
import { Query, ApolloConsumer } from "react-apollo";
import GroceryList from './grocery_list'
import queries from '../../graphql/queries';
const { CURRENT_USER, GET_CURRENT_USER_INGREDIENTS, GET_INGREDIENT } = queries;

class Grocery extends Component{
  constructor(props) {
    super(props);
    this.state = {
      savedIngredients: []
    }
  }
  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          if (!this.state.currentUserId) {
            client.query({query: CURRENT_USER})
              .then(data => {
                let currentUserId = data.data.currentUser;
                <Query query={GET_CURRENT_USER_INGREDIENTS} variables={{ id: currentUserId }}>
                  {({ loading, error, data }) => {
                    let ingredientIdArray = data.ingredients;
                    let ingredientArr = [];
                    ingredientIdArray.forEach(ingredientId => {
                      <Query query={GET_INGREDIENT} variables={{ id: ingredientId }}>
                        {({ loading, error, data }) => {
                          ingredientArr.push(data.ingredient);
                        }}
                      </Query>
                    })
                  }}
                </Query>
              })
          }
          return (
            <div className="grocery-container">
              <GroceryList />
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Grocery;