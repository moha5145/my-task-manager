import React from "react";
import axios from "axios";
import { Delete, Save } from "@mui/icons-material";

import ColoredButton from "../../../../shared/buttons/ColoredButton";
import FlatButton from "../../../../shared/buttons/FlatButton";
import Details from "./Details";
import Priority from "./Priority";
import DueDate from "./DueDate";
import Status from "./Status";

const AccordionContent = ({
  state,
  todo,
  category,
  dispatch,
  focus,
  setFocus,
  apiUrl,
  index
}) => {
  
  const expandedClass = todo.expanded ? "max-h-auto " : "max-h-0 ";

  const onDeleteTodo = async () => {
    const response = await axios.post(`${apiUrl}/todo/delete`, todo);
    dispatch({ type: "deleteTodo", payload: {todos: response.data, todo}});
  }

  const onUpdateTodo = async (e) => {
    e.preventDefault();
    const response = await axios.put(`${apiUrl}/todo/update`, todo);
    dispatch({ type: "updateTodo", payload: response.data });
    dispatch({ type: "copyTodos" });
  }

  return (
    <div
      className={`pt-0 w-full overflow-hidden transition-[max-height] duration-500 ease-in ${expandedClass}`}
    >
      <div className=" sm:flex sm:flex-row gap-2">
        <div className="flex-1">
          <Details
            state={state}
            todo={todo}
            dispatch={dispatch}
            focus={focus}
            setFocus={setFocus}
            category={category}
            index={index}
          />
        </div>
        <div className="flex-1 ">
          <DueDate
            state={state}
            todo={todo}
            dispatch={dispatch}
            focus={focus}
            setFocus={setFocus}
            category={category}
          />
          <Priority
            todo={todo}
            dispatch={dispatch}
            focus={focus}
            setFocus={setFocus}
            category={category}
          />
          <Status
            todo={todo}
            state={state}
            dispatch={dispatch}
            focus={focus}
            setFocus={setFocus}
            category={category}
            apiUrl={apiUrl}
          />
          <div className="flex ml-auto mr-3 gap-1 w-12 justify-center items-center self-end my-2 mb-4 text-right">
            <ColoredButton
              Icon={Save}
              disabled={!todo?.isEditing}
              backgroundColor={todo?.isEditing ? "#62c188" : "#e5e7eb"}
              color="white"
              onClick={onUpdateTodo}
            />

            <FlatButton
              Icon={Delete}
              color="#ef4444"
              p={1}
              onClick={onDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccordionContent;
