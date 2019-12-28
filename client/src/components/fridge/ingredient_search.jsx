import React from "react";

class IngredientSearch extends React.Component {
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
      `http://api.edamam.com/auto-complete?q=${userInput}&limit=10&app_id=abcacee6&app_key=7f1529c466e340c215eea57a940d63c6`
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
      this.setState({
        selectionIndex: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[selectionIndex]
      });
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

    return (
      <React.Fragment>
        <div className="ingredient-search-container">
          <input
            className="ingredient-input"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            name={userInput}
          />
          {suggestionsListComponent}
        </div>
      </React.Fragment>
    );
  }
}

export default IngredientSearch;
