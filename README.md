# What's in the Fridge?

[Live Link](http://whatsinthefridgetonight.herokuapp.com/#/)

What’s in the Fridge? helps users find recipes based upon ingredients they already have in their fridge! We drew inspiration from many recipe sites but ulitmately decided to create our own unique take on how to search for dinner tonight.

<img width="922" alt="Screenshot 2020-01-21 20 09 24" src="https://user-images.githubusercontent.com/34895686/72864872-7be54d80-3c8a-11ea-9220-93d416e28963.png">

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

![](https://user-images.githubusercontent.com/29221213/73306539-0b868100-41e2-11ea-8628-ddb2e0254810.png)

## The primary technical challenges will be:
* API Limitations - There are a lot of recipe search APIs out there, EDAMAM is one of the most complete and consistent libraries of recipes especially at the free teir. Given it was our best option for the project we had to creatively utelize the keywoard search feature to search for recipes and then parse the ingredient list of each recipe to validate that it utelizes all fridge ingredients.

* Storing relational data in a a non-relational database - MongoDB works well for this project but storing relational data has to be organized different than we are used to when using a SQL database. To store saved recipes and a grocery list instead of creating joins tables we were able to store all the data necessary right in the Users collection. 



