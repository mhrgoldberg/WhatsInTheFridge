import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import mutations from '../../graphql/mutations';
import SearchForm from "./SearchForm";
import SearchRecipes from './SearchRecipes';
const { VERIFY_USER } = mutations;

const API_KEY = "bc82ac6d721c875a3d0e602f1b537fef";

const API_ID = "234908ad";


class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentUserId: null
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
    debugger;
    if (!this.state.currentUserId) {
      return (
        <Mutation mutation={VERIFY_USER}>
          {(verifyUser, { data }) => {
            if (!this.state.currentUserId) {
              let token = localStorage.getItem("auth-token");
              verifyUser({ variables: { token }})
              .then(response => {
                this.setState({currentUserId: response.data.verifyUser._id});
                debugger;
              });
            }  
          }}
        </Mutation>
      )
    } else {
      return (
        <div className="Search">
          <header className="Search-header">
            <h1 className="Search-title">Recipe Search</h1>
          </header>
          <SearchForm getRecipe={this.getRecipe} />
          <SearchRecipes recipes={this.state.recipes} currentUserId={this.state.currentUserId} />
        </div>
      )
    }
  }
};

export default Search;


