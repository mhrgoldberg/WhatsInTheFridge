# What's in the Fridge?

[Live Link](http://whatsinthefridgetonight.herokuapp.com/#/)

**What’s in the Fridge?** helps users find recipes based upon ingredients they already have in their fridge! We drew inspiration from many recipe sites but ulitmately decided to create our own unique take on how to search for dinner tonight.

![Screen Shot 2020-03-06 at 2 42 42 PM](https://user-images.githubusercontent.com/34895686/80053572-1cd5e580-84d2-11ea-9583-93b0ff3368ef.png)

### Technologies & Technical Challenges
* Node JS
* Express
* MongoDB
* HTML
* CSS

### Libraries
* React JS
* Mongoose
* BCrypt, JSONWebToken, Passport for user authentication
* Validator
* Bodyparser middleware
* GraphQL
* Apollo
* Chart.js

### External API
* Edamam Recipe and Ingredient API

## Functionality

There are three main components to the site, the fridge, recipe search, and grocery list. The fridge is where you can track ingredients you actually have in your refrigirator at home! Once you have added a few food items to your fridge you can search for recipes that include the ingredients in your fridge list. For the ingredients you don't already have at home when you save a recipe it will auto-generate a grocery list for you!(grocery list feature currently in development!) The recipe and ingredient search features are powered by the Edamam API.

### Fridge

The fridge is what makes this recipe search engiene unique. Instead of searching for a recipe directly users can input their food items directly into the fridge with a convenient autofill feature which utilizes keyboard and mouse inputs to select to select from a list of food item suggestions from the Edamam autofill API.

![Screen Shot 2020-03-13 at 9 53 51 AM](https://user-images.githubusercontent.com/34895686/80053940-f2385c80-84d2-11ea-99f1-1a25bda5c891.png)


### Search 

Once a user has populated the fridge list a search can be intiated. The search feature performs a keyword search to the EDAMAM API with all the listed fridge items and returns all recipes with the included ingredients. One of the largest challenges while developing this app was the finding solutions for the limitations of the API. At the free level the API does not offer direct ingredient search. To ensure that every recipe returned from the search actually includes the ingredients in the users fridge list every recipes ingedient list is parsed to ensure that the results displayed are acurate. 

Below is the code used to parse recipes returned from the API search:
  ```javascript
  checkFridge = (data) => {
    // Iterate through fridge list
    for (let i = 0; i < this.props.fridgeArr.length; i++) {
      const fridgeIngredient = this.props.fridgeArr[i];
      // Default "valid" boolean to false until ingredient is found in recipe ingredient list
      let valid = false;
      for (let j = 0; j < data.recipe.ingredientLines.length; j++) {
        const ingredientString = data.recipe.ingredientLines[j];
        if (ingredientString.includes(fridgeIngredient)) {
          // if the ingredient is found search no further and check next fridge ingredient
          valid = true;
          break;
        }
      }
      // if ingredient is not found in list imediately stop searching and early return false
      if (!valid) return false;
    }
    // if we have searched every ingredient in the fridge and they have been found return true
    return true;
  };
  ```


### Advanced Search

Below is a snapshot of the main functionality of the advanced search. The advanced search interpolates a string based upon user inputs and sends that string interpolation to the API. A more complete advanced search feature could be implemented with a paid version of the API, but our free version limits the scope of coverage for inputs. 

```javascript
  getRecipe = async (payload) => {
    const recipeName2 = this.props.fridgeArr.join(", ");
    const num_ingredients = payload.maxIngredients;
    let dietString = "";
    let healthString = "";
    let dishString = "";
    let calMin = payload.calMin;
    let calMax = payload.calMax;
    let calString = "";
    let timeMin = payload.timeMin;
    let timeMax = payload.timeMax;
    let timeString = "";
    let excludeString = "";

    let excludeVal1 = payload.exclude1;
    let excludeVal2 = payload.exclude2;
    let excludeVal3 = payload.exclude3;
    let excludeVal4 = payload.exclude4;

    if (excludeVal1 !== "") {
      excludeString += "&excluded=" + excludeVal1;
    }
    if (excludeVal2 !== "") {
      excludeString += "&excluded=" + excludeVal2;
    }
    if (excludeVal3 !== "") {
      excludeString += "&excluded=" + excludeVal3;
    }
    if (excludeVal3 !== "") {
      excludeString += "&excluded=" + excludeVal4;
    }

    if (calMin === "" && calMax === "") {
      calString = "";
    } else if (calMin > calMax) {
      calString = "&calories=" + calMin + "%2B";
    } else if (calMin === "" || calMin === "0") {
      calString = "&calories=" + calMax;
    } else if (calMin < calMax) {
      calString = "&calories=" + calMin + "-" + calMax;
    } else {
      calString = "";
    }

    if (timeMin === "" && timeMax === "") {
      timeString = "";
    } else if (timeMin > timeMax) {
      timeString = "&time=" + timeMin + "%2B";
    } else if (timeMin === "" || timeMin === "0") {
      timeString = "&time=" + timeMax;
    } else if (timeMin < timeMax) {
      timeString = "&time=" + timeMin + "-" + timeMax;
    } else {
      timeString = "";
    }

    let dietChoice = payload.dietChoice;

    if (dietChoice !== "") {
      dietString = "&diet=" + dietChoice;
    } else {
      dietString = dietChoice;
    }

    let healthChoices = [
      payload.alcoholFree,
      payload.peanutFree,
      payload.sugarConscious,
      payload.treeNutFree,
    ];

    let healthValues = [
      "alcohol-free",
      "peanut-free",
      "sugar-conscious",
      "tree-nut-free",
    ];

    healthChoices.map((choice, i) => {
      if (choice) {
        healthString += "&health=" + `${healthValues[i]}`;
      } else {
        healthString += "";
      }
    });

    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/api.edamam.com/search?   q=${recipeName2}&app_id=${API_ID}&app_key=${API_KEY}&from=${0}&to=${50}&ingr=${num_ingredients}${dietString}${healthString}${dishString}${calString}${timeString}${excludeString}`
    );
    const data = await api_call.json();

    const parsedData = this.checkRecipeArr(data.hits);

    await this.props.addToRecipes(parsedData);
    this.setState({ spinner: false, firstSearch: true });
  };
  ```

### Search Results

The Edamam API is unique becuase it compiles recipes from many different sources and provides an analysis of the recipes health information. Every recipe result in our app has a button which opens a modal displaying the macronutrients and calories for the recipe. Utelizing Chart.js we created a useful data visualization to breakdown the macronutrient balance for a quick visual assesment to judge if the recipe fits into your diet!

![Screen Shot 2020-03-13 at 9 50 37 AM](https://user-images.githubusercontent.com/34895686/80053895-d765e800-84d2-11ea-8a03-0baccff86cd9.png)





