import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Search from './RecipeSearch/Search';

class Main extends Component {
 
  render() {
    return (
      <div className="main-container">
        <Nav />
        <div className="main-outer-container">
          <div className="main-inner-container1">
            Div 1
            
          </div>
          <div className="main-inner-container2">
            Div 2
            <Search />
          </div>
          <div className="main-inner-container3">
            Div 3
          </div>
        </div>
      </div>
    )
  }
}

export default Main;