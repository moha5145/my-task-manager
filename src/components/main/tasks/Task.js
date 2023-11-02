import React, { useRef, useState } from "react";
import axios from "axios";

import { priorityStyle } from "../../Reducer";

import TaskHeader from "./TaskHeader";
import Columns from "./Columns";

const Task = ({ state, category, dispatch, apiUrl }) => {
  const [dragging, setDragging] = useState(false);
  const [focus, setFocus] = useState(false);  

  const dragItem = useRef({});
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    setDragging(true);
    dragItem.current = item;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => setDragging(true), 0);
  };

const handleDragEnter = async (event, targetItem, columns) => {
  const currentItem = dragItem.current;
  const newList = [...columns];

  if (dragItemNode.current !== event.target) {
    const sourceTasks = newList[currentItem.columnIndex].todos;
    const targetTasks = newList[targetItem.columnIndex].todos;
    
    const [removed] = sourceTasks.splice(currentItem.todoIndex, 1);
    targetTasks.splice(targetItem.todoIndex, 0, removed);
    
    dragItem.current = targetItem;
    
    const isDifferentColumn = currentItem.columnIndex !== targetItem.columnIndex;
    const targetColumns = newList[targetItem.columnIndex];
    const todo = {...removed, status: targetColumns.title, columnId: targetColumns._id};
  
    dispatch({ type: "moveUpAndDown", payload: { category, newList, task: todo, targetColumns } });
    
    if (isDifferentColumn) {
      await axios.put(`${apiUrl}/todo/update`, todo);
    }  
  }
};
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    if (
      dragItem.current?.columnIndex === item.columnIndex &&
      dragItem.current.todoIndex === item.todoIndex
    ) {
      return `bg-red-400 rounded-lg border-l-8 pr-1 mb-2`;
    }
    return `bg-yellow-400 rounded-lg border-l-8 pr-1 mb-2`;
  };
  return (
    <div className=" flex flex-col flex-grow justify-between ">
      <TaskHeader state={state} category={category} dispatch={dispatch} apiUrl={apiUrl} />

      <div
        className="flex w-full justify-center items-start flex-grow "
        style={{ backgroundColor: category?.color?.secondary }}
      >
        <Columns
          state={state}
          category={category}
          dispatch={dispatch}
          dragging={dragging}
          focus={focus}
          setFocus={setFocus}
          priorityStyle={priorityStyle}
          handleDragEnter={handleDragEnter}
          handletDragStart={handletDragStart}
          getStyles={getStyles}
          apiUrl={apiUrl}
        />
      </div>
    </div>
  );
};
export default Task;
