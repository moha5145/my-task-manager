import React from "react";

import Task from "../components/main/tasks/Task";
import Footer from "../components/footer";

const Tasks = ({ state, category, dispatch }) => {
  return (
    <div className="flex flex-col flex-grow">
      <Task
        state={state}
        category={category}
        dispatch={dispatch}
        name="taskInput"
      />
      <Footer category={category} />
    </div>
  );
};
export default Tasks;
