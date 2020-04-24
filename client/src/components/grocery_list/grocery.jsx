import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import GroceryList from "./grocery_list";
import queries from "../../graphql/queries";
import Loading from "../loading"
const { CURRENT_USER } = queries;

class Grocery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedIngredients: [],
      currentUserId: null,
      loading: true
    };
  }
  render() {
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
          if (this.state.loading) return <Loading />;
          return (
            <div className="grocery-container">
              <GroceryList currentUserId={this.state.currentUserId} />
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Grocery;
