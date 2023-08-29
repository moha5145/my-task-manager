import React from "react";
import { Add } from "@mui/icons-material";

// import FlatButton from "../../custom/buttons/FlatButton";
import IconButton from "../../custom/buttons/IconButton";
import CustomInput from "../../custom/inputs/CustomInput";

const AddTask = ({
  column,
  category,
  state,
  dispatch,
  focus,
  autoFocus,
  setFocus,
  status,
  columnIndex,
}) => {
  return (
    <div className="flex justify-between items-center gap-2 my-1 p-1  mb-2 max-h-[50px] bg-white rounded-md ">
      <input
        autoFocus={autoFocus}
        placeholder="Title"
        onChange={(e) => {
          dispatch({
            type: "taskTitle",
            payload: { columnIndex, column, title: e.target.value },
          });
        }}
        value={column.taskTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            dispatch({
              type: "addTodo",
              payload: {
                category,
                title: column.taskTitle,
                status,
                columnIndex,
              },
            });
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
        className={`h-auto rounded-md w-full
           my-0 
          p-2 overflow-y-hidden resize-non focus:outline-indigo-[${category?.color?.primary}] border-solid rounded-md decoration-2`}
      />

      <IconButton
        Icon={Add}
        color={category?.color?.primary}
        className="p-0"
        onClick={() =>
          dispatch({
            type: "addTodo",
            payload: {
              category,
              title: column.taskTitle,
              status,
              columnIndex,
            },
          })
        }
      />
    </div>
  );
};
export default AddTask;