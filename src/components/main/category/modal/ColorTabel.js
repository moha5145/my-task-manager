import React from "react";

const ColorTable = ({ state, dispatch }) => {
  return (
    <div className="flex flex-wrap gap-2 ">
      {state.colorPalette.map((color, index1) => (
        <div
          key={index1}
          style={{ backgroundColor: color.primary }}
          className={`rounded-full w-14 h-14 hover:opacity-70 active:opacity-70 cursor-pointer`}
          onClick={() => dispatch({ type: "color", payload: color })}
        ></div>
      ))}
    </div>
  );
};
export default ColorTable;
