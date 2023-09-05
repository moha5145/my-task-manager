import React from "react";
import DatePicker from "./DatePicker";

const DueDate = ({ state, todo, dispatch, category, focus, setFocus }) => {
  return (
    <div className="w-full">
      <p className="text-gray-400">Date d'écheance</p>
      <div className="flex flex-wrap gap-1">
        <button
          className="flex-1 text-xs sm:text-md bg-gray-200 px-2 py-1 rounded"
          onClick={() =>
            dispatch({
              type: "updateTodos",
              payload: {
                dueDate: new Date().toISOString().split("T")[0],
                id: todo.id,
              },
            })
          }
        >
          Aujourd'hui
        </button>

        <button
          className="flex-1 text-xs sm:text-md bg-gray-200 px-2 py-1 rounded"
          onClick={() => {
            const currDate = new Date();
            currDate.setDate(currDate.getDate() + 1);
            const datePlusOne = currDate.toISOString().split("T")[0];
            dispatch({
              type: "updateTodos",
              payload: {
                dueDate: datePlusOne,
                id: todo.id,
              },
            });
          }}
        >
          Demain
        </button>

        <div className="flex-1 text-xs sm:text-md bg-gray-200 rounded-md">
          <DatePicker
            state={state}
            todo={todo}
            dispatch={dispatch}
            focus={focus}
            setFocus={setFocus}
            category={category}
          />
        </div>
      </div>
    </div>
  );
};
export default DueDate;
