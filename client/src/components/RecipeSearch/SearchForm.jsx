import React from 'react';

const SearchForm = props => (
  <form onSubmit={props.getRecipe}>
    <input type="text" name="recipeName"/>
    <button id="search-btn">Search</button>
  </form>
);

export default SearchForm; 

