import React, { Component } from 'react';

import SearchAdvancedForm from "./SearchAdvancedForm";
import SearchRecipes from './SearchRecipes';

const API_KEY = "bc82ac6d721c875a3d0e602f1b537fef";

const API_ID = "234908ad";


class SearchAdvanced extends Component {
  state = {
    recipes: [], 
    error: ""
  };

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    const num_ingredients = e.target.elements.num_ingredients.value;
    let dietString = "";
    let healthString = "";
    let cuisineString = "";
    let mealString = "";
    let dishString = "";
    let calMin = e.target.elements.caloriesMin.value;
    let calMax = e.target.elements.caloriesMax.value;
    let calString = "";
    let timeMin = e.target.elements.timeMin.value; 
    let timeMax = e.target.elements.timeMax.value;
    let timeString = "";
    let excludeString = "";

    let excludeVal1 = e.target.elements.exclude1.value; 
    let excludeVal2 = e.target.elements.exclude2.value; 
    let excludeVal3 = e.target.elements.exclude3.value; 
    let excludeVal4 = e.target.elements.exclude4.value; 

    if (excludeVal1 !== "") {
      excludeString += "&excluded=" + excludeVal1 
    } 
    if (excludeVal2 !== "") {
      excludeString += "&excluded=" + excludeVal2 
    } 
    if (excludeVal3 !== "") {
      excludeString += "&excluded=" + excludeVal3
    } 
    if (excludeVal3 !== "") {
      excludeString += "&excluded=" + excludeVal4
    }
    
    if (calMin === "" && calMax === "") {
      calString = ""
    } else if (calMin > calMax) {
      calString = "&calories=" + calMin + "%2B"
    } else if (calMin === "" || calMin === "0") {
      calString = "&calories=" + calMax
    } else if (calMin < calMax ) {
      calString = "&calories=" + calMin + "-" + calMax
    } else {
      calString = ""
    }

    if (timeMin === "" && timeMax === "") {
      timeString = ""
    } else if (timeMin > timeMax) {
      timeString = "&time=" + timeMin + "%2B"
    } else if (timeMin === "" || timeMin === "0") {
      timeString = "&time=" + timeMax
    } else if (timeMin < timeMax) {
      timeString = "&time=" + timeMin + "-" + timeMax
    } else {
      timeString = ""
    }

    let dietChoice = e.target.elements.diet.value;

    if (dietChoice !== "") {
      dietString = "&diet=" + dietChoice
    } else {
      dietString = dietChoice
    }

    let mealChoice = e.target.elements.meal_type.value; 
    if (mealChoice !== "") {
      mealString = "&mealType=" + mealChoice
    } else {
      mealString = mealChoice
    }

    let healthChoices = [];
    let cuisineChoices = [];
    let dishChoices = []; 

    for (let i = 0; i < 30; i++) {
      healthChoices[i] = e.target.elements[i+5]
    }
    for (let i = 0; i < 18; i++) {
      cuisineChoices[i] = e.target.elements[i+35]
    }

    for (let i = 0; i < 14; i++) {
      dishChoices[i] = e.target.elements[i+54]
    }

    healthChoices.map((choice, i) => {
      if (choice.checked) {
        healthString += "&health=" + choice.value
      } else {
        healthString += ""
      }
    })

    cuisineChoices.map((choice, i) => {
      if (choice.checked) {
        cuisineString += "&cuisineType=" + choice.value
      } else {
        cuisineString += ""
      }
    })

    dishChoices.map((choice, i) => {
      if (choice.checked) {
        dishString += "&dishType=" + choice.value
      } else {
        dishString += ""
      }
    })

  
    
    // "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"
    // console.log(excludeString);
    
    e.preventDefault();
    console.log(`https://api.edamam.com/search?q=${recipeName}&app_id=${API_ID}&app_key=${API_KEY}&from=${from}&to=${to}&ingr=${num_ingredients}${dietString}${healthString}${cuisineString}${mealString}${dishString}${calString}${timeString}${excludeString}`);
    try {
      const api_call = await fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${API_ID}&app_key=${API_KEY}&from=${from}&to=${to}&ingr=${num_ingredients}${dietString}${healthString}${cuisineString}${mealString}${dishString}${calString}${timeString}${excludeString}`);

      const data = await api_call.json();
    
      this.setState({ recipes: data.hits })
    } catch(err) {
      this.setState({error: "No results found"})
    }
    // console.log(data.hits[0].recipe.url);
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
          <h1 className="Search-title-as">Advanced Search</h1>
        </header>
        <SearchAdvancedForm getRecipe={this.getRecipe} />
        <SearchRecipes recipes={this.state.recipes} error={this.state.error}/>

      </div>
    )
  }
};

export default SearchAdvanced;


