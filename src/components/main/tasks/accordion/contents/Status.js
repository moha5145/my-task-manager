import axios from "axios";
import React from "react";

const Status = ({ dispatch, todo, category, focus, setFocus, apiUrl }) => {
  
  const onChangeStatus = async (e) => {
    const newStatus = e.target.value;
    const updatedTodo = { ...todo, status: newStatus };
    const response = await axios.put(`${apiUrl}/todo/update`, updatedTodo);
    dispatch({ type: "updateTodos", payload: { name: "status", value: response.data.status, _id: todo._id} });
  }

  const selectStyle = focus
    ? {
        borderColor: category?.color?.primary,
        outlineColor: category?.color?.primary,
        ring: category?.color?.primary,
      }
    : { outline: "none", border: "none", ring: "none" }

  return (
    <div className="bg-red flex-1 mt-1">
      <label
        htmlFor="small"
        className="block w-full text-sm font-medium text-gray-400"
      >
        Status
      </label>
      <select
        id="status"
        defaultValue={todo.status}
        className="w-full p-1 bg-[#E5E7EB]
          mb-3 text-sm text-gray-900 border 
          border-gray-300 rounded-md
          dark:border-gray-600 dark:placeholder-gray-400"
        onChange={onChangeStatus}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={selectStyle}
      >
        {category.columns.map((column) => (
          <option key={column.id} value={column.title}>
            {column.title}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Status;
