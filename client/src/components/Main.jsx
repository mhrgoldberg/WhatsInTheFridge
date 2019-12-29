import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Search from './RecipeSearch/Search';
import Fridge from './fridge/fridge';

class Main extends Component {
 
  render() {
    return (
      <div className="main-container">
        <Nav />
        <div className="main-outer-container">
          <div className="main-inner-container1">
            <Fridge />
          </div>
          <div className="main-inner-container2">
            <Search />
          </div>
          <div className="main-inner-container3">
          </div>
        </div>
      </div>
    )
  }
}

export default Main;