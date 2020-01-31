import React from "react";

const SearchAdvancedForm = props => (
  <React.Fragment>
    <form className="as-form" onSubmit={props.getRecipe}>
    <div className="pop-up-dropdowns">
        <div className="healthSection">
          <div className="as-dropdown">
            <label>
              Health Options
              <div className="as-health-dropdown-content">
                <div>
                  <label>
                    <p>Alchohol-free</p>
                    <input
                      type="checkbox"
                      name="alcohol_free"
                      value="alcohol-free"
                    />
                  </label>
                  <br />
                  <label>
                    <p>Peanuts</p>
                    <input
                      type="checkbox"
                      name="peanut_free"
                      value="peanut-free"
                    />
                  </label>
                  <br />
                  <label>
                    <p>Sugar-Conscious</p>
                    <input
                      type="checkbox"
                      name="sugar_conscious"
                      value="sugar-conscious"
                    />
                  </label>
                  <br />
                  <label>
                    <p>Tree Nuts</p>
                    <input
                      type="checkbox"
                      name="tree_nut_free"
                      value="tree-nut-free"
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
              Calories
              <br />
              <div className="as-dropdown-content">
                <label>
                  Min
                  <input
                    type="number"
                    name="caloriesMin"
                    defaultValue=""
                    step="100"
                  />
                </label>
                <br />
                <label>
                  Max
                  <input
                    type="number"
                    name="caloriesMax"
                    defaultValue=""
                    step="100"
                  />
                </label>
              </div>
            </label>
          </div>
        </div>
        <div className="exclude-section">
          <div className="as-dropdown">
            <label>
              Exclude
              <div className="as-dropdown-content">
                <br />
                <input type="text" placeholder="Item 1" name="exclude1" />
                <br />
                <input type="text" placeholder="Item 2" name="exclude2" />
                <br />
                <input type="text" placeholder="Item 3" name="exclude3" />
                <br />
                <input type="text" placeholder="Item 4" name="exclude4" />

              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="keyboard-inputs">
        <input type="hidden" name="from" defaultValue="0" />
        <label>
          <p>Max Ingredients</p>
          <input type="number" name="num_ingredients" defaultValue="10" />
        </label>
          <label>
            <label>Time</label>
            <div className="time-container">

                <input type="number" name="timeMin" placeholder="min" defaultValue="" step="1" />
            
                <input type="number" name="timeMax" placeholder="max" defaultValue="" step="1" />

            </div>
          </label>
        <label>
          Diet
          <br />
          <select className="diet-select" name="diet" defaultValue="">
            <option value=""></option>
            <option value="balanced">Balanced</option>
            <option value="high-protein">High Protein</option>
            <option value="low-fat">Low Fat</option>
            <option value="low-carb">Low Carb</option>
          </select>
        </label>
      </div>

      

      <button className="as-search-btn">Search</button>
    </form>
  </React.Fragment>
);

export default SearchAdvancedForm;
