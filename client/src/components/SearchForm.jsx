import React from 'react';

const SearchForm = props => (
  <form onSubmit={props.getRecipe}>
    <input type="text" name="recipeName"/>
    <button>Search</button>
  </form>
);

export default SearchForm; 

