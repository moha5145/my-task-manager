import React, { useEffect, useRef } from "react";
import { resizeTextArea } from "../../../../Reducer";

const Notes = ({ todo, dispatch, focus, setFocus, category }) => {
  const textAreaRef = useRef([]);
  useEffect(() => {
    resizeTextArea(textAreaRef);
  }, [todo]);

  const handleChange = (e) => {
    dispatch({
      type: "updateTodos",
      payload: {
        details: e.target.value,
        id: todo.id,
      },
    });
  };
  return (
    <textarea
      ref={(element) => textAreaRef?.current?.push(element)}
      placeholder="Notes"
      autoFocus
      rows="8"
      name="detail"
      onChange={handleChange}
      defaultValue={todo.details}
      className={` p-2 h-auto w-full my-0 flex-1 focus:outline-indigo-400 border-solid border-indigo-400 rounded-md ${
        todo.done && "line-through"
      } decoration-2`}
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
      style={
        focus ? { outlineColor: category?.color?.primary } : { border: "none" }
      }
    />
  );
};
export default Notes;
