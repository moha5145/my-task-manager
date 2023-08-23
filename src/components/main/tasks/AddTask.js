import React from "react";
import AddIcon from "@mui/icons-material/Add";

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
    <div className="flex justify-between items-center gap-2 my-1 p-1  mb-1    max-h-[50px] bg-white rounded-md ">
      <CustomInput
        autoFocus={autoFocus}
        placeholder="Title"
        onChange={(e) => {
          // e.preventDefault();
          console.log("e.target.value", e.target.value);
          dispatch({
            type: "taskTitle",
            payload: { columnIndex, column, title: e.target.value },
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch({
              type: "addTodo",
              payload: {
                category,
                title: state.columns[columnIndex].taskTitle,
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
        value={state.columns[columnIndex].taskTitle}
        style={
          focus
            ? { outlineColor: category?.color?.primary }
            : { border: "none" }
        }
        className={`h-auto rounded-md w-full
           my-0 
          p-2 overflow-y-hidden resize-non focus:outline-indigo-[${category?.color?.primary}] border-solid rounded-md decoration-2`}
      />
      {/* <FlatButton
        Icon={AddIcon}
        color={category?.color?.primary}
        className="p-0"
        onClick={() =>
          dispatch({
            type: "addTodo",
            payload: { category, title: state.taskTitle },
          })
        }
      /> */}

      <IconButton
        Icon={AddIcon}
        color={category?.color?.primary}
        className="p-0"
        onClick={() =>
          dispatch({
            type: "addTodo",
            payload: {
              category,
              title: state.columns[columnIndex].taskTitle,
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
