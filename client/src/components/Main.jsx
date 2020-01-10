
import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Search from './RecipeSearch/Search';
import Fridge from './fridge/fridge';
import SearchAdvanced from './RecipeSearch/SearchAdvanced';
import Modal from "./Modal.jsx";
import Backdrop from "./Backdrop.jsx";


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

  handleSearchToggle() {
      if (this.state.search) {
        this.setState({ search: false, advancedSearch: true })
      }
      if (this.state.search === false) {
        this.setState({ search: true, advancedSearch: false })
      }
  }

  handleASToggle() {
    if (this.state.advancedSearch) {
      this.setState({ advancedSearch: false, search: true })
    }
    if (this.state.advancedSearch === false) {
      this.setState({ advancedSearch: true, search: false })
    }
  }

  render() {
    let midDiv;
    if (this.state.search) {
      midDiv = <div className="main-inner-container2">
        <div className="main-inner-container2-headings">
          <h1 className="selected">Search</h1>
          <h1 onClick={this.handleASToggle}>Advanced Search</h1>
        </div>
        <div className="main-inner-container2-content">
          <h1>
            Welcome to What's in the Fridge? A new way to find delicous recipes. 
          </h1>
          <div className="fridge-instructions-2">
            <p>
              Add up to 4 items to your Fridge List to the left, then we will find
              tonight's dinner using ingredients you already have! If you don't
              have an ingredient in the recipe we will add it to your grocery
              list.
            </p>
          </div>
        </div>
        {/* <img src="/../src/images/logo-transparent_2.svg" alt="" /> */}
        <Search fridgeArr={this.state.fridgeArr} />
     
        {/* <SearchAdvanced /> */}
      </div>
    }

    if (this.state.advancedSearch) {
      midDiv = <div className="main-inner-container2">
        <div className="main-inner-container2-headings">
          <h1 onClick={this.handleASToggle}>Search</h1>
          <h1 className="selected">Advanced Search</h1>
        </div>
        {/* <Search fridgeArr={this.state.fridgeArr} /> */}
        <SearchAdvanced fridgeArr={this.state.fridgeArr} />
        {/* <React.Fragment>
          <Backdrop canCancel onCancel={this.handleASToggle} />
          <Modal
            title="Advanced Search"
            canCancel
            canConfirm
            onCancel={this.handleSearchToggle}
            onConfirm={this.handleSearchToggle}
            children={SearchAdvanced}
            submit="Search"
          >
            <SearchAdvanced />
          </Modal>
        </React.Fragment> */}
      </div>
    }


    return (
      <div className="main-container">
        <Nav />
        <div className="main-outer-container">
          <div className="main-inner-container1">
            <Fridge fridgeArr={this.state.fridgeArr} addToFridge={this.addToFridge} />
          </div>
          {/* <div className="main-inner-container2">
            <div className="main-inner-container2-headings">
              <h1>Search</h1>
              <h1>Advanced Search</h1>
            </div>
            <Search fridgeArr={this.state.fridgeArr} />
            <SearchAdvanced />
            
          </div> */}
          {midDiv}
          <div className="main-inner-container3"></div>
        </div>
      </div>
    );
  }
}

export default Main;


