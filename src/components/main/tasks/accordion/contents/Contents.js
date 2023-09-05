import React from "react";
import { Delete } from "@mui/icons-material";

import ColoredButton from "../../../../shared/buttons/ColoredButton";
import Notes from "./Notes";
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
}) => {
  const expandedClass = todo.expanded ? "max-h-auto " : "max-h-0 ";

  return (
    <div
      className={`pt-0 w-full overflow-hidden transition-[max-height] duration-500 ease-in ${expandedClass}`}
    >
      <div className=" sm:flex sm:flex-row gap-2">
        <div className="flex-1">
          <Notes
            todo={todo}
            dispatch={dispatch}
            focus={focus}
            setFocus={setFocus}
            category={category}
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
          />
          <div className="flex flex-col ml-auto w-12 justify-center items-center self-end my-2 mb-4 text-right">
            <ColoredButton
              Icon={Delete}
              backgroundColor="#ef4444"
              color="white"
              onClick={() => dispatch({ type: "deleteTodo", payload: todo })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccordionContent;
