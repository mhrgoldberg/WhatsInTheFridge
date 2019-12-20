import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import mutations from '../../graphql/mutations';
import queries from '../../graphql/queries';
import SearchForm from "./SearchForm";
import SearchRecipes from './SearchRecipes';
const { VERIFY_USER } = mutations;
const { CURRENT_USER } = queries;

const API_KEY = "bc82ac6d721c875a3d0e602f1b537fef";

const API_ID = "234908ad";


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentUserId: null,
      loading: true
    };
    this.getRecipe = this.getRecipe.bind(this);
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;

    e.preventDefault();
    const api_call = await fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${API_ID}&app_key=${API_KEY}`);
    console.log(recipeName);

    const data = await api_call.json();
    this.setState({ recipes: data.hits })
    // console.log(data.hits[0].recipe.url);
    // console.log(this.state.recipes);
  }
  
  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          if (!this.state.currentUserId) {
            client.query({query: CURRENT_USER})
              .then(data => {
                this.setState({currentUserId: data.data.currentUser, loading: false})
              })
          }
          if (this.state.loading) return null;
          return (
            <div className="Search">
              <div className="search-top">
                <header className="Search-header">
                  <h1 className="Search-title">Recipe Search</h1>
                </header>
                <SearchForm getRecipe={this.getRecipe} />
             </div>
              <div className="search-bottom">
                <SearchRecipes recipes={this.state.recipes} currentUserId={this.state.currentUserId}/>
              </div>
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
};

export default Search;


