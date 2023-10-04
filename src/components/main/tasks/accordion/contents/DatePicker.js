import React from "react";

const DatePicker = ({ dispatch, todo, category, focus, setFocus }) => {
  const onChangeDate = (e) => {
    e.preventDefault();
    const dueDate = e.target.value;
    dispatch({type: 'isTodoChanged', payload: {name:'dueDate', value: dueDate, _id: todo._id}});
    
    dispatch({ type: "updateTodos", payload: { name: 'dueDate', value: dueDate, _id: todo._id } });
  }

  return (
    <>
      <input
        type="date"
        id="start"
        name="trip-start"
        onChange={onChangeDate}
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
