import React from "react";
import FridgeList from "./fridge_list";
import IngredientSearch from "./ingredient_search";

class Fridge extends React.Component {
  render() {
    <div className="FridgeContainer">
      <IngredientSearch />
      <FridgeList />
    </div>;
  }
}

export default Fridge;
