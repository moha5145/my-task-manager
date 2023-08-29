import React, { useState } from "react";
import { uid } from "uid";
import { Save, Add, Remove } from "@mui/icons-material";

const AddColumn = ({ dispatch, category }) => {
  const [showInput, setShowInput] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex gap-1 sm:gap-3 fixed bottom-[5.8%] right-2 sm:right-10 h-10 sm:h-12">
      {showInput ? (
        <input
          type="text"
          autoFocus
          placeholder="Add new column"
          className="rounded-md p-2 shadow-xl"
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
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          style={
            focus
              ? { outlineColor: category?.color?.primary }
              : { border: "none" }
          }
        />
      ) : null}

      {showInput && columnName.length > 2 ? (
        <button
          className="   bg-green-400 text-white rounded-md h-full px-1 sm:px-3 hover:opacity-60 shadow-xl"
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
          <Save fontSize="large" />
        </button>
      ) : (
        <button
          className="   bg-red-400 text-white rounded-md h-full px-1 sm:px-3 text-center hover:opacity-60 shadow-xl"
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          {showInput ? <Remove fontSize="large" /> : <Add fontSize="large" />}
        </button>
      )}
    </div>
  );
};
export default AddColumn;
