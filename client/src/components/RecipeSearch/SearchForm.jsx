import React from "react";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({ toggle: false });
  }
  render() {
    let instructions = <div className="main-inner-container2-content">
      <h1>
        Welcome to What's in the Fridge? A new way to find delicous recipes.
      </h1>
      <div className="fridge-instructions-2">
        <p>
          Add up to 4 items to your Fridge List to the left, then we will find
          tonight's dinner using ingredients you already have! If you don't have
          an ingredient in the recipe we will add it to your grocery list.
        </p>
      </div>
    </div>;
    if (!this.state.toggle) {
      instructions = <div></div>;
    }
    return (
      <React.Fragment>
        {instructions}
        <form onSubmit={this.props.getRecipe}>
          <button id="search-btn" onClick={this.handleToggle}>
            Search
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchForm;
