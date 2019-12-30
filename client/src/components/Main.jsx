import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Search from './RecipeSearch/Search';
import Fridge from './fridge/fridge';
import SearchAdvanced from './RecipeSearch/SearchAdvanced';

class Main extends Component {
 
  render() {
    return (
      <div className="main-container">
        <Nav />
        <div className="main-outer-container">
          <div className="main-inner-container1">
            Div 1
            <Fridge />
            {/* <a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by dashu83 - www.freepik.com</a> */}
          </div>
          <div className="main-inner-container2">
            <Search />
            {/* <SearchAdvanced /> */}
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