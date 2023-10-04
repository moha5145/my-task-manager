import React from "react";
import axios from "axios";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";

import IconButton from "../../shared/buttons/IconButton";

const AddTask = ({
  column,
  category,
  dispatch,
  focus,
  autoFocus,
  setFocus,
  status,
  columnIndex,
  apiUrl
}) => {
  const payload = {
    title: column.taskTitle,
    status,
    details: "",
    priority: "aucune",
    dueDate: "",
    isDragging: false,
    isEditing: false,
    categoryId: category._id,
    expanded: false,
  };

  const onSubmit = async () => {
    const response = await axios.post(`${apiUrl}/todo/create`, payload);
    dispatch({
      type: "addTodo",
      payload: response.data,
    });
  };

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
            if (column.taskTitle) {
              e.preventDefault();
              onSubmit();
            } else {
              toast.error("Veuillez entrer un titre !", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
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

      {column.taskTitle ? (
        <IconButton
          Icon={Add}
          color={category?.color?.primary}
          className="p-0"
          onClick={() => {
            onSubmit()
          }}
        />
      ) : null}
    </div>
  );
};
export default AddTask;
