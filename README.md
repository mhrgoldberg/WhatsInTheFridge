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

<img width="645" alt="Screen Shot 2020-04-22 at 8 14 16 PM" src="https://user-images.githubusercontent.com/34895686/80055180-ee5a0980-84d5-11ea-9663-e69c1e7f9bbe.png">


### Advanced Search

Below is a snapshot of the main functionality of the advanced search. The advanced search interpolates a string based upon user inputs and sends that string interpolation to the API. A more complete advanced search feature could be implemented with a paid version of the API, but our free version limits the scope of coverage for inputs. 

![](https://user-images.githubusercontent.com/29221213/73307923-c57eec80-41e4-11ea-88f4-07fe905e15a8.png)

![](https://user-images.githubusercontent.com/29221213/73307935-cadc3700-41e4-11ea-8b40-41996c15580d.png)

### Search Results

The search results show a picture of the recipe and provides 4 action options for users. A user has the option to follow a link to the actual recipe or save the recipe. In addition, a user can expand either the health facts or the ingredients from the recipe. 

![Screen Shot 2020-03-13 at 9 50 37 AM](https://user-images.githubusercontent.com/34895686/80053895-d765e800-84d2-11ea-8a03-0baccff86cd9.png)

![](https://user-images.githubusercontent.com/29221213/73307250-75ebf100-41e3-11ea-80f0-bcfb08f4ce3a.png)





