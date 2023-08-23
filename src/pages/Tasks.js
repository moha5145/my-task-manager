import React from "react";
import { useLocation } from "react-router";
import Task from "../components/main/tasks/Task";

const Tasks = ({ state, dispatch }) => {
  const location = useLocation();

  const { category } = location?.state;

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
