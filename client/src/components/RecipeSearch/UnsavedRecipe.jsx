// import React, { Component } from 'react';

// import SearchForm from "./SearchForm";
// import SearchRecipes from './SearchRecipes';

// http://www.edamam.com/ontologies/edamam.owl#recipe_c7cb4785919818e7180e9064dd813ff9
// 'https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl#recipe_c7cb4785919818e7180e9064dd813ff9&app_id=34908ad&app_key=bc82ac6d721c875a3d0e602f1b537fef`

// const API_KEY = "bc82ac6d721c875a3d0e602f1b537fef";

// const API_ID = "234908ad";


// class UnsavedRecipe extends Component {
//   state = {
//     recipes: []
//   };

//   getRecipe = async (e) => {
//     const recipeName = e.target.elements.recipeName.value;

//     e.preventDefault();
//     const api_call = await fetch(`https://api.edamam.com/search?r=${recipeURI}&app_id=${API_ID}&app_key=${API_KEY}`);
//     console.log(recipeName);

//     const data = await api_call.json();
//     console.log(data);
//     this.setState({ recipes: data.hits })
//     // console.log(data.hits[0].recipe.url);
//     // console.log(this.state.recipes);
//   }

//   render() {
//     return (
//       <div className="Search">
//         <header className="Search-header">
//           <h1 className="Search-title">Recipe Search</h1>
//         </header>
//         <SearchForm getRecipe={this.getRecipe} />
//         <SearchRecipes recipes={this.state.recipes} />

//       </div>
//     )
//   }
// };

// export default UnsavedRecipe;
