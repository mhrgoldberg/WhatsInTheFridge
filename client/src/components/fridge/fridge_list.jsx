import React from "react";

const FridgeList = ({ fridgeListArr }) => (
  <ul className="fridge-list">
    {fridgeListArr.map(ingredient => (
      <li>{ingredient}</li>
    ))}
  </ul>
);

export default FridgeList;
