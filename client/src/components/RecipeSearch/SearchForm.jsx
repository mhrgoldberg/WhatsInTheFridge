import React from 'react';

const SearchForm = props => (
  <form onSubmit={props.getRecipe}>
    <button id="search-btn">Search</button>
  </form>
);

export default SearchForm; 

