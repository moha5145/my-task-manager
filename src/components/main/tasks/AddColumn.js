import React, { useState } from "react";
import { uid } from "uid";
import { Save, Add, Remove } from "@mui/icons-material";

const AddColumn = ({ dispatch, category }) => {
  const [showInput, setShowInput] = useState(false);
  const [columnName, setColumnName] = useState("");

  return (
    <div className="fixed top-[21.8%] right-3 flex gap-3 shadow-2xl h-10">
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
                type: "addNewColumn",
                payload: {
                  id: uid(),
                  categoryId: category.id,
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
          className="   bg-green-400 text-white rounded-md h-full px-2 "
          onClick={() => {
            dispatch({
              type: "addNewColumn",
              payload: {
                id: uid(),
                categoryId: category.id,
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
          <Save />
        </button>
      ) : (
        <button
          className="   bg-red-400 text-white rounded-md h-full px-2 text-center"
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          {showInput ? <Remove /> : <Add />}
        </button>
      )}
    </div>
  );
};
export default AddColumn;
