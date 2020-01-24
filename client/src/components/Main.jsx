import Grocery from './grocery_list/grocery.jsx';
import React, { Component } from "react";
import Nav from "./Nav.jsx";
import Search from "./RecipeSearch/Search";
import Fridge from "./fridge/fridge";
import SearchAdvanced from "./RecipeSearch/SearchAdvanced";
// import Modal from "./Modal.jsx";
// import Backdrop from "./Backdrop.jsx";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeArr: [],
      search: true,
      advancedSearch: false
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
      this.setState({ search: false, advancedSearch: true });
    }
    if (this.state.search === false) {
      this.setState({ search: true, advancedSearch: false });
    }
  }

  handleASToggle() {
    if (this.state.advancedSearch) {
      this.setState({ advancedSearch: false, search: true });
    }
    if (this.state.advancedSearch === false) {
      this.setState({ advancedSearch: true, search: false });
    }
  }

  render() {
    let midDiv;
    if (this.state.search) {
      midDiv = (
        <div className="main-inner-container2">
          <div className="main-inner-container2-headings">
            <h1 className="selected">Search</h1>
            <h1 onClick={this.handleASToggle}>Advanced Search</h1>
          </div>
          <Search fridgeArr={this.state.fridgeArr} />
        </div>
      );
    }

    if (this.state.advancedSearch) {
      midDiv = (
        <div className="main-inner-container2">
          <div className="main-inner-container2-headings">
            <h1 onClick={this.handleASToggle}>Search</h1>
            <h1 className="selected">Advanced Search</h1>
          </div>
          <SearchAdvanced fridgeArr={this.state.fridgeArr} />
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
          <div className="main-inner-container3"></div>
        </div>
      </div>
    );
  }
}

export default Main;
