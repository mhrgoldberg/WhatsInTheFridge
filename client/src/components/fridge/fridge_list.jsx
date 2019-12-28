import React from "react";

const FridgeList = ({ fridgeListArr }) => (
  <div className="fridge-list-chalkboard">
    <h4>Fridge List</h4>
    <ul className="fridge-list">
      {fridgeListArr.map(ingredient => (
        <li>{ingredient}</li>
      ))}
    </ul>
  </div>
);

export default FridgeList;
