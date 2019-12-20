import React from 'react'
import GroceryList from './grocery_list'
import IngredientForm from './ingredient_form'

class Grocery {
  render(){
    <div className="grocery-container">
      <IngredientForm />
      <GroceryList />
    </div>
  }
}

export default Grocery;