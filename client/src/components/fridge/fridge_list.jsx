import React from "react";

const FridgeList = ({ fridgeListArr, deleteFridgeItem }) => (
  <div className="fridge-list-chalkboard">
    <h4>Fridge List</h4>
    <ul className="fridge-list">
      {fridgeListArr.map((ingredient, i) => {
        return <div key={i}>
          <li>{ingredient}</li>
          <button
            onClick={() => {deleteFridgeItem(i)}}
          >
            X
          </button>
        </div>;
      })}
    </ul>
    
  </div>
);

export default FridgeList;
