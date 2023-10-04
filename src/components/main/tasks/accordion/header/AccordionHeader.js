import React from "react";
import axios from "axios";
import { ExpandMore, ExpandLess, DragIndicator } from "@mui/icons-material";

import IconButton from "../../../../shared/buttons/IconButton";
import CustomInput from "../../../../shared/inputs/CustomInput";

const AccordionHeader = ({ todo, dispatch, category, focus, setFocus, apiUrl }) => {

  const dueDate = () => {
    const currDate = new Date();
    const today = currDate.toISOString().split("T")[0];
    currDate.setDate(currDate.getDate() + 1);
    const tomorrow = currDate.toISOString().split("T")[0];

    switch (todo.dueDate) {
      case today:
        return "Ajourd'hui";
      case tomorrow:
        return "Demain";
      default:
        return new Date(todo.dueDate).toLocaleDateString();
    }
  };

  const onChangeTitle = (e) => {
    const title = e.target.value
    dispatch({type: 'isTodoChanged', payload: {name:'title', value: title, _id: todo._id}});

    dispatch({ type: "updateTodos", payload: { name: 'title', value: title, _id: todo._id } });
  }

  return (
    <div className="flex w-full  gap-2 mb-1 justify-between items-center">
      <DragIndicator />

      <CustomInput
        placeholder="title"
        defaultValue={todo.title}
        category={category}
        className={`h-auto px-1 mx-0 py-2 my-0 w-full  overflow-y-hidden resize-non focus:outline-indigo-[${category.color.primary}] border-solid rounded-md decoration-2`}
        onChange={onChangeTitle}
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
      {todo.dueDate ? (
        <div className="text-xs min-w-[65px]">{dueDate()}</div>
      ) : null}
      <div className="">
        <IconButton
          Icon={todo.expanded ? ExpandLess : ExpandMore}
          color={category.color.primary}
          onClick={async () => {
            const updatedTodo = { ...todo, expanded: !todo.expanded };
            dispatch({ type: "expanded", payload: todo });
            await axios.put(`${apiUrl}/todo/update`, updatedTodo);
          }}
        />
      </div>
    </div>
  );
};
export default AccordionHeader;
