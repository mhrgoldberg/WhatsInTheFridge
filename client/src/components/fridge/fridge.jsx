import React from "react";
import FridgeList from "./fridge_list";
import IngredientSearch from "./ingredient_search";



class Fridge extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fridgeArr: ['milk', 'cookies', 'broccoli', 'cabbage']
    }
  }

  render() {
    return (
      <div className="FridgeContainer">
        <IngredientSearch />
        <FridgeList fridgeListArr={this.state.fridgeArr}/>
      </div>
    )
  }
}

export default Fridge;
