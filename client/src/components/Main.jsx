
import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Search from './RecipeSearch/Search';
import Fridge from './fridge/fridge';
import SearchAdvanced from './RecipeSearch/SearchAdvanced';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeArr: []
    };
    this.addToFridge = this.addToFridge.bind(this);
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

  render() {
    return (
      <div className="main-container">
        <Nav />
        <div className="main-outer-container">
          <div className="main-inner-container1">
            <Fridge fridgeArr={this.state.fridgeArr} addToFridge={this.addToFridge} />
          </div>
          <div className="main-inner-container2">
            <Search fridgeArr={this.state.fridgeArr} />

          </div>
          <div className="main-inner-container3"></div>
        </div>
      </div>
    );
  }
}

export default Main;
