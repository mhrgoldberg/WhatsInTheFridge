import React from "react";

const FridgeList = ({ fridgeListArr, deleteFridgeItem }) => (
  <div className="fridge-list-chalkboard">
    <div className="main-inner-container1-heading">
      <h1>Fridge List</h1>
    </div>
    <ul className="fridge-list">
      {fridgeListArr.map((ingredient, i) => {
        return (
          <div key={i}>
            <li>{ingredient}</li>
            <button
              onClick={() => {
                deleteFridgeItem(i);
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </ul>
  </div>
);

export default FridgeList;
