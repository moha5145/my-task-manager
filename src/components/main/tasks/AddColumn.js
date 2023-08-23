import React, { useState } from "react";
import { uid } from "uid";

const AddColumn = ({ dispatch }) => {
  const [showInput, setShowInput] = useState(false);
  const [columnName, setColumnName] = useState("");

  return (
    <div className="fixed top-52 right-1 flex gap-3 shadow-md h-10">
      {showInput ? (
        <input
          type="text"
          autoFocus
          placeholder="Add new column"
          className="rounded-md p-2"
          onChange={(e) => setColumnName(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              dispatch({
                type: "addColumn",
                payload: {
                  id: uid(),
                  title: columnName,
                  color: "lightgreen",
                  taskTitle: "",
                  showMenu: false,
                  todos: [],
                },
              });
              setShowInput(false);
            }
          }}
        />
      ) : null}

      {showInput && columnName.length > 2 ? (
        <button
          className="   bg-green-400 text-white rounded-md h-full px-4 text-3xl"
          onClick={() => {
            dispatch({
              type: "addColumn",
              payload: {
                id: uid(),
                title: columnName,
                color: "lightgreen",
                taskTitle: "",
                showMenu: false,
                todos: [],
              },
            });
            setShowInput(false);
          }}
        >
          save
        </button>
      ) : (
        <button
          className="   bg-red-400 text-white rounded-md h-full px-3 text-center text-3xl"
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          {showInput ? <span>-</span> : <span>+</span>}
        </button>
      )}
    </div>
  );
};
export default AddColumn;
