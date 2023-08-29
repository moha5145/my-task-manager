import React from "react";

const Status = ({ state, dispatch, todo, category, focus, setFocus }) => {
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
        onChange={(e) => {
          dispatch({
            type: "updateTodos",
            payload: {
              status: e.target.value,
              id: todo.id,
            },
          });
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={
          focus
            ? {
                borderColor: category?.color?.primary,
                outlineColor: category?.color?.primary,
                ring: category?.color?.primary,
              }
            : { outline: "none", border: "none", ring: "none" }
        }
      >
        {category.columns.map((column) => (
          <option key={column.id} value={column.title}>
            {column.title}
          </option>
        ))}
        {/* <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option> */}
      </select>
    </div>
  );
};
export default Status;
