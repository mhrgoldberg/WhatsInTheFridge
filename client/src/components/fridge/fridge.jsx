import React from "react";
import FridgeList from "./fridge_list";

class Fridge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionIndex: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const userInput = e.currentTarget.value;
    e.preventDefault(e);

    this.setState({
      userInput
    });
    this.apiCall(userInput);
  };

  apiCall = async userInput => {
    const api_call = await fetch(
      `http://api.edamam.com/auto-complete?q=${userInput}&limit=5&app_id=abcacee6&app_key=7f1529c466e340c215eea57a940d63c6`
    );
    const filteredSuggestions = await api_call.json();

    this.setState({
      selectionIndex: 0,
      filteredSuggestions,
      showSuggestions: true
    });
  };

  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      selectionIndex: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { selectionIndex, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      let input = this.state.userInput;
      if (filteredSuggestions[selectionIndex]) {
        input = filteredSuggestions[selectionIndex];
      }
      this.setState(
        {
          selectionIndex: 0,
          showSuggestions: false,
          userInput: input
        },
        () => {
          this.props.addToFridge(this.state.userInput);
          this.setState({
            userInput: ""
          });
        }
      );
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (selectionIndex === 0) {
        return;
      }

      this.setState({ selectionIndex: selectionIndex - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (selectionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ selectionIndex: selectionIndex + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { selectionIndex, filteredSuggestions, showSuggestions, userInput }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === selectionIndex) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions yet!</em>
          </div>
        );
      }
    }

    let ingredientInput;

    if (this.props.fridgeArr.length < 4) {
      ingredientInput = (
        <input
          className="ingredient-input"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          name={userInput}
          placeholder="Add items to your fridge here!"
        />
      );
    } else {
      ingredientInput = (
        <div className="ingredient-input-full">Fridge List is full!</div>
      );
    }

    return (
      <div className="fridge-container">
        <div className="fridge-instructions ">
          <p>
            Add up to 4 items to your Fridge List below, then we will find
            tongiht's dinner using ingredients you already have! If you don't
            have an ingredient in the recipe we will add it to your grocery
            list.
          </p>
        </div>
        <FridgeList fridgeListArr={this.props.fridgeArr} />
        <div className="ingredient-search-container">
          {ingredientInput}
          {suggestionsListComponent}
        </div>
      </div>
    );
  }
}

export default Fridge;
