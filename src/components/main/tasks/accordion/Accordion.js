import React from "react";
import AccordionHeader from "./header/AccordionHeader";
import AccordionContent from "./contents/Contents";

const Accordion = ({
  todo,
  category,
  index,
  state,
  dispatch,
  focus,
  setFocus,
}) => {
  return (
    <div className=" mt-1 ">
      <AccordionHeader
        todo={todo}
        dispatch={dispatch}
        category={category}
        index={index}
        state={state}
        focus={focus}
        setFocus={setFocus}
      />

      <div className={` ${todo.expanded ? "flex" : "hidden"} px-1`}>
        <AccordionContent
          todo={todo}
          dispatch={dispatch}
          category={category}
          state={state}
          index={index}
          focus={focus}
          setFocus={setFocus}
        />
      </div>
    </div>
  );
};
export default Accordion;
