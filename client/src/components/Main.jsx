import Grocery from './grocery_list/grocery.jsx';
import React, { Component } from "react";
import Nav from "./Nav.jsx";
import Search from "./RecipeSearch/Search";
import Fridge from "./fridge/fridge";
import SearchAdvanced from "./RecipeSearch/SearchAdvanced";
// import Modal from "./Modal.jsx";
// import Backdrop from "./Backdrop.jsx";
import { Query, ApolloConsumer } from "react-apollo";
import queries from './../graphql/queries';
import SavedRecipesList from './grocery_list/saved_recipes';
import Loading from './loading.jsx';
const { CURRENT_USER } = queries;


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeArr: [],
      search: true,
      savedReicpes: false,
      currentUserId: null
    };
    this.addToFridge = this.addToFridge.bind(this);
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
    this.handleASToggle = this.handleASToggle.bind(this);
    this.deleteFridgeItem = this.deleteFridgeItem.bind(this);
  }

  addToFridge(item) {
    const fridgeArrCopy = [...this.state.fridgeArr];
    if (item && this.state.fridgeArr.length < 4) {
      fridgeArrCopy.push(item);
      this.setState({
        fridgeArr: fridgeArrCopy
      });
    }
  }

  deleteFridgeItem(i) {
    const fridgeArrCopy = this.state.fridgeArr.slice(0);
    fridgeArrCopy.splice( i, 1 )
    this.setState({
      fridgeArr: fridgeArrCopy
    });
  }

  handleSearchToggle() {
    if (this.state.search) {
      this.setState({ search: false, savedReicpes: true });
    }
    if (this.state.search === false) {
      this.setState({ search: true, savedReicpes: false });
    }
  }

  handleASToggle() {
    if (this.state.savedReicpes) {
      this.setState({ savedReicpes: false, search: true });
    }
    if (this.state.savedReicpes === false) {
      this.setState({ savedReicpes: true, search: false });
    }
  }

  render() {
    let midDiv;
    if (this.state.search) {
      midDiv = (
        <div className="main-inner-container2">
          <div className="main-inner-container2-headings">
            <h1 className="selected">Search</h1>
            <h1 onClick={this.handleASToggle}>Saved Recipes</h1>
          </div>
          <SearchAdvanced fridgeArr={this.state.fridgeArr} />
        </div>
      );
    }

    if (this.state.savedReicpes) {
      midDiv = (
        <div className="main-inner-container2">
          <div className="main-inner-container2-headings">
            <h1 onClick={this.handleASToggle}>Search</h1>
            <h1 className="selected">Saved Recipes</h1>
          </div>
          {/* component here */}
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
              if (this.state.loading) return Loading;
              return (
                <ul className="SavedRecipesList">
                  <SavedRecipesList currentUserId={this.state.currentUserId}/>
                </ul>
              );
            }}
          </ApolloConsumer>
        </div>
      );
    }

    return (
      <div className="main-container">
        <Nav />
        <div className="main-outer-container">
          <div className="main-inner-container1">

            <Fridge
              fridgeArr={this.state.fridgeArr}
              deleteFridgeItem={this.deleteFridgeItem}
              addToFridge={this.addToFridge}
            />
          </div>
         
          {midDiv}
          <div className="main-inner-container3">
            <div className="grocery-chalkboard">
            <div className="main-inner-container3-heading">
              <h1>Grocery List</h1>
            </div>
            <div className="grocery-board">
              <Grocery />
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
