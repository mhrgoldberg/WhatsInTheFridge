import React from "react";

class SearchAdvancedForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  formatData(e) {
    e.preventDefault();
    this.props.getRecipe(this.props.searchOptions)

  
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
 
    this.props.updateSearchAdvancedState(value, name);
  }

  render() {
    return (
      <React.Fragment>
        <form className="as-form" onSubmit={this.formatData}>
          <div className="pop-up-dropdowns">
            <div className="healthSection">
              <div className="as-dropdown">
                <label>
                  Health Options <i className="fas fa-caret-down"></i>
                  <div className="as-health-dropdown-content">
                    <div>
                      <label>
                        <p>Alchohol-free</p>
                        <input
                          type="checkbox"
                          name="alcoholFree"
                          value="alcoholFree"
                          checked={this.props.searchOptions.alcoholFree}
                          onChange={this.handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        <p>Peanuts</p>
                        <input
                          type="checkbox"
                          name="peanutFree"
                          value="peanutFree"
                          checked={this.props.searchOptions.peanutFree}
                          onChange={this.handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        <p>Sugar-Conscious</p>
                        <input
                          type="checkbox"
                          name="sugarConscious"
                          value="sugarConscious"
                          checked={this.props.searchOptions.sugarConscious}
                          onChange={this.handleInputChange}
                        />
                      </label>
                      <br />
                      <label>
                        <p>Tree Nuts</p>
                        <input
                          type="checkbox"
                          name="treeNutFree"
                          value="treeNutFree"
                          checked={this.props.searchOptions.treeNutFree}
                          onChange={this.handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                  <br />
                </label>
              </div>
            </div>

            <div className="cuisineSection">
              <div className="as-dropdown">
                <label>
                  Calories <i className="fas fa-caret-down"></i>
                  
                  <div className="as-dropdown-content">
                    <input
                      type="number"
                      name="calMin"
                      step="100"
                      placeholder="min"
                      value={this.props.searchOptions.calMin}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="number"
                      name="calMax"
                      step="100"
                      placeholder="max"
                      value={this.props.searchOptions.calMax}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="exclude-section">
              <div className="as-dropdown">
                <label>
                  Exclude ingredients <i className="fas fa-caret-down"></i>
                  <div className="as-dropdown-content">
                    <input
                      type="text"
                      placeholder="Item 1"
                      name="exclude1"
                      value={this.props.searchOptions.exclude1}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="text"
                      placeholder="Item 2"
                      name="exclude2"
                      value={this.props.searchOptions.exclude2}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="text"
                      placeholder="Item 3"
                      name="exclude3"
                      value={this.props.searchOptions.exclude3}
                      onChange={this.handleInputChange}
                    />
                    <input
                      type="text"
                      placeholder="Item 4"
                      name="exclude4"
                      value={this.props.searchOptions.exclude4}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="keyboard-inputs">
            <input type="hidden" name="from" defaultValue="0" />
            <label>
              <p>Max Ingredients</p>
              <input
                type="number"
                name="maxIngredients"
                value={this.props.searchOptions.maxIngredients}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <label>Time(min)</label>
              <div className="time-container">
                <input
                  type="number"
                  name="timeMin"
                  placeholder="min"
                  step="1"
                  value={this.props.searchOptions.timeMin}
                  onChange={this.handleInputChange}
                />

                <input
                  type="number"
                  name="timeMax"
                  placeholder="max"
                  step="1"
                  value={this.props.searchOptions.timeMax}
                  onChange={this.handleInputChange}
                />
              </div>
            </label>
            <label>
              Diet
              <br />
              <select
                className="diet-select"
                name="dietChoice"
                onChange={this.handleInputChange}
                defaultValue={this.props.searchOptions.dietChoice}
              >
                <option value="">--</option>
                <option value="balanced">Balanced</option>
                <option value="high-protein">High Protein</option>
                <option value="low-fat">Low Fat</option>
                <option value="low-carb">Low Carb</option>
              </select>
            </label>
          </div>

          {/* <button className="as-search-btn">Search</button> */}
        </form>
      </React.Fragment>
    );
  }
}


export default SearchAdvancedForm;
