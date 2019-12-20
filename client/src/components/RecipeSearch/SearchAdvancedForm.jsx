import React from 'react';

const SearchAdvancedForm = props => (
  <form onSubmit={props.getRecipe}>
    <label>Keyword
      <input type="text" name="recipeName" />
    </label>
    <br/>
    <input type="hidden" name="from" defaultValue="0" />
    <label>Num Results
      <input type="number" name="to" defaultValue="5" />
    </label>
    <br/>
    <label>Max Num Ingredients
      <input type="number" name="num_ingredients" defaultValue="10"/>
    </label>
    <br/>
    <br/>
    <label>Diet
      <br/>
      <select name="diet" defaultValue="">
        <option value=""></option>
        <option value="balanced">Balanced</option>
        <option value="high-protein">High Protein</option>
        <option value="high-fiber">High Fiber</option>
        <option value="low-fat">Low Fat</option>
        <option value="low-carb">Low Carb</option>
        <option value="low-sodium">Low Sodium</option>
      </select>
    </label>
    <br/>
    <br/>
    <label>Health Options
      <br/>
      <label>Alchohol-free
        <input type="checkbox" name="alcohol_free" value="alcohol-free"/>
      </label>
      <br/>
      <label>Celery-free
        <input type="checkbox" name="celery_free" value="celery-free" />
      </label>
      <br/>
      <label>Crustacean-free
        <input type="checkbox" name="crustacean_free" value="crustacean-free" />
      </label>
      <br/>
      <label>Dairy
        <input type="checkbox" name="dairy_free" value="dairy-free" />
      </label>
      <br/>
      <label>Eggs
        <input type="checkbox" name="egg_free" value="egg-free" />
      </label>
      <br/>
      <label>Fish
        <input type="checkbox" name="fish_free" value="fish-free" />
      </label>
      <br/>
      <label>FODMAP free
        <input type="checkbox" name="fodmap_free" value="fodmap-free" />
      </label>
      <br />
      <label>Gluten
        <input type="checkbox" name="gluten_free" value="gluten-free" />
      </label>
      <br />
      <label>Keto
        <input type="checkbox" name="keto_friendly" value="keto_friendly" />
      </label>
      <br />
      <label>Kidney friendly 
        <input type="checkbox" name="kidney_friendly" value="kidney-friendly" />
      </label>
      <br />
      <label>Kosher
        <input type="checkbox" name="kosher" value="kosher" />
      </label>
      <br />
      <label>Low potassium
        <input type="checkbox" name="low_potassium" value="low-potassium" />
      </label>
      <br />
      <label>Lupine-free
        <input type="checkbox" name="lupine_free" value="lupine-free" />
      </label>
      <br />
      <label>Mustard-free
        <input type="checkbox" name="mustard_free" value="mustard-free" />
      </label>
      <br />
      <label>n/a
        <input type="checkbox" name="low_fat_abs" value="low-fat-abs" />
      </label>
      <br />
      <label>No oil needed
        <input type="checkbox" name="no_oil_needed" value="no-oil-needed" />
      </label>
      <br />
      <label>No-sugar
        <input type="checkbox" name="low_sugar" value="low-sugar" />
      </label>
      <br />
      <label>Paleo
        <input type="checkbox" name="paleo" value="paleo" />
      </label>
      <br />
      <label>Peanuts
        <input type="checkbox" name="peanut_free" value="peanut-free" />
      </label>
      <br />
      <label>Pescatarian
        <input type="checkbox" name="pescatarian" value="pescatarian" />
      </label>
      <br />
      <label>Pork-free
        <input type="checkbox" name="pork_free" value="pork-free" />
      </label>
      <br />
      <label>Red meat-free
        <input type="checkbox" name="red_meat_free" value="red-meat-free" />
      </label>
      <br />
      <label>Sesame-free
        <input type="checkbox" name="sesame_free" value="sesame-free" />
      </label>
      <br />
      <label>Shellfish
        <input type="checkbox" name="shellfish_free" value="shellfish-free" />
      </label>
      <br />
      <label>Soy
        <input type="checkbox" name="soy_free" value="soy-free" />
      </label>
      <br />
      <label>Sugar-conscious
        <input type="checkbox" name="sugar_conscious" value="sugar-conscious" />
      </label>
      <br />
      <label>Tree Nuts
        <input type="checkbox" name="tree_nut_free" value="tree-nut-free" />
      </label>
      <br />
      <label>Vegan
        <input type="checkbox" name="vegan" value="vegan" />
      </label>
      <br />
      <label>Vegetarian
        <input type="checkbox" name="vegetarian" value="vegetarian" />
      </label>
      <br />
      <label>Wheat-free
        <input type="checkbox" name="wheat_free" value="wheat-free" />
      </label>
      <br />
    </label>
    <br/>
    <br />
    <label>CuisineType
      <br />
      <label>American
        <input type="checkbox" name="American" value="American" />
      </label>
      <br />
      <label>Asian
        <input type="checkbox" name="Asian" value="Asian" />
      </label>
      <br />
      <label>British
        <input type="checkbox" name="British" value="British" />
      </label>
      <br />
      <label>Caribbean
        <input type="checkbox" name="Caribbean" value="Caribbean" />
      </label>
      <br />
      <label>Central Europe
        <input type="checkbox" name="Central Europe" value="Central Europe" />
      </label>
      <br />
      <label>Chinese
        <input type="checkbox" name="Chinese" value="Chinese" />
      </label>
      <br />
      <label>Eastern Europe
        <input type="checkbox" name="Eastern Europe" value="Eastern Europe" />
      </label>
      <br />
      <label>French
        <input type="checkbox" name="French" value="French" />
      </label>
      <br />
      <label>Indian
        <input type="checkbox" name="Indian" value="Indian" />
      </label>
      <br />
      <label>Italian
        <input type="checkbox" name="Italian" value="Italian" />
      </label>
      <br />
      <label>Japanese
        <input type="checkbox" name="Japanese" value="Japanese" />
      </label>
      <br />
      <label>Kosher
        <input type="checkbox" name="Kosher" value="Kosher" />
      </label>
      <br />
      <label>Mediterranean
        <input type="checkbox" name="Mediterranean" value="Mediterranean" />
      </label>
      <br />
      <label>Mexican
        <input type="checkbox" name="Mexican" value="Mexican" />
      </label>
      <br />
      <label>Middle Eastern
        <input type="checkbox" name="Middle Eastern" value="Middle Eastern" />
      </label>
      <br />
      <label>Nordic
        <input type="checkbox" name="Nordic" value="Nordic" />
      </label>
      <br />
      <label>South American
        <input type="checkbox" name="South American" value="South American" />
      </label>
      <br />
      <label>South East Asian
        <input type="checkbox" name="South East Asian" value="South East Asian" />
      </label>
      
    </label>
    <br/>
    <br/>
    <label>Meal Type 
      <br />
      <select name="meal_type" defaultValue="">
        <option value=""></option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="breakfast">Breakfast</option>
        <option value="snack">Snack</option>
      </select>
    </label>
    <br/>
    <br/>

    <label>Dish Type
      <br />
      <label>Bread
        <input type="checkbox" name="Bread" value="Bread" />
      </label>
      <br />
      <label>Cereals
        <input type="checkbox" name="Cereals" value="Cereals" />
      </label>
      <br />
      <label>Condiments and Sauces 
        <input type="checkbox" name="Condiments and sauces" value="Condiments and sauces" />
      </label>
      <br />
      <label>Drinks
        <input type="checkbox" name="Drinks" value="Drinks" />
      </label>
      <br />
      <label>Desserts
        <input type="checkbox" name="Desserts" value="Desserts" />
      </label>
      <br />
      <label>Main Course
        <input type="checkbox" name="Main course" value="Main course" />
      </label>
      <br />
      <label>Pancake
        <input type="checkbox" name="Pancake" value="Pancake" />
      </label>
      <br />
      <label>Preps
        <input type="checkbox" name="Preps" value="Preps" />
      </label>
      <br />
      <label>Preserve
        <input type="checkbox" name="Preserve" value="Preserve" />
      </label>
      <br />
      <label>Salad
        <input type="checkbox" name="Salad" value="Salad" />
      </label>
      <br />
      <label>Side Dish
        <input type="checkbox" name="Side dish" value="Side dish" />
      </label>
      <br />
      <label>Soup
        <input type="checkbox" name="Soup" value="Soup" />
      </label>
      <br />
      <label>Starter
        <input type="checkbox" name="Starter" value="Starter" />
      </label>
      <br />
      <label>Sweets
        <input type="checkbox" name="Sweets" value="Sweets" />
      </label>
      <br />
    </label>
    <br/>
    <br/>

    <label>Calories
      <br/>
      <label>Min
        <input type="number" name="caloriesMin" defaultValue="" step="100"/>
      </label>
      <br/>
      <label>Max
        <input type="number" name="caloriesMax" defaultValue="" step="100"/>
      </label>
    </label>
    <br/>
    <br/>

    <label>Time
      <br />
      <label>Min 
        <input type="number" name="timeMin" defaultValue="" step="1" />
      </label>
      <br />
      <label>Max
        <input type="number" name="timeMax" defaultValue="" step="1" />
      </label>
    </label>
    <br/>
    <br/>

    <label>Exclude 
      <br/>
      <input type="text" name="exclude1" />
      <br/>
      <input type="text" name="exclude2" />
      <br/>
      <input type="text" name="exclude3" />
      <br/>
      <input type="text" name="exclude4" />
    </label>

    <br/>
    <br/>

 
    <button>Search</button>
  </form>
);

export default SearchAdvancedForm;

