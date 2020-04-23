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

There are three main components to the site, the fridge, recipe search, and grocery list. The fridge is where you can track ingredients you actually have in your refrigirator at home! Once you have added a few food items to your fridge you can search for recipes that include the ingredients in your fridge list. For the ingredients you don't already have at home when you save a recipe it will auto-generate a grocery list for you!(grocery list feature currently in development!) The recipe and ingredient search features are powered by the EDAMAM API.

### Fridge

The fridge is a list of food items that the user inputs based upon the food items the user has. This list populates the main search inputs. 

![](https://user-images.githubusercontent.com/29221213/73306539-0b868100-41e2-11ea-8628-ddb2e0254810.png)

### Search 

Once a user has populated the fridge list, the user hits search. After hitting search, the search function makes a call to the Edamam API which returns results. 

![](https://user-images.githubusercontent.com/29221213/73306878-b4cd7700-41e2-11ea-8bba-592f73829556.png)

### Advanced Search

Below is a snapshot of the main functionality of the advanced search. The advanced search interpolates a string based upon user inputs and sends that string interpolation to the API. A more complete advanced search feature could be implemented with a paid version of the API, but our free version limits the scope of coverage for inputs. 

![](https://user-images.githubusercontent.com/29221213/73307923-c57eec80-41e4-11ea-88f4-07fe905e15a8.png)

![](https://user-images.githubusercontent.com/29221213/73307935-cadc3700-41e4-11ea-8b40-41996c15580d.png)

### Search Results

The search results show a picture of the recipe and provides 4 action options for users. A user has the option to follow a link to the actual recipe or save the recipe. In addition, a user can expand either the health facts or the ingredients from the recipe. 

![](https://user-images.githubusercontent.com/29221213/73307250-75ebf100-41e3-11ea-80f0-bcfb08f4ce3a.png)





