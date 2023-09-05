import React from "react";

const DatePicker = ({ state, dispatch, todo, category, focus, setFocus }) => {
  return (
    <>
      <input
        type="date"
        id="start"
        name="trip-start"
        onChange={(e) => {
          e.preventDefault();
          dispatch({
            type: "updateTodos",
            payload: {
              dueDate: e.target.value,
              id: todo.id,
            },
          });
        }}
        value={todo.dueDate || new Date().toISOString().split("T")[0]}
        min="2022-01-01"
        className="w-full appearance-none border bg-[#E5E7EB] rounded-md shadow p-1"
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
    </>
  );
};
export default DatePicker;
