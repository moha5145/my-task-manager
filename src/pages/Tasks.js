import React from "react";

import Task from "../components/main/tasks/Task";

const Tasks = ({ state, category, dispatch }) => {
  return (
    <div className="flex flex-col flex-grow">
      <Task
        state={state}
        category={category}
        dispatch={dispatch}
        name="taskInput"
      />
    </div>
  );
};
export default Tasks;
