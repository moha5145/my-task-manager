import React, { useEffect, useRef, useState } from "react";

import { nested, priorityStyle } from "../../Reducer";

import TaskHeader from "./TaskHeader";
import AddTask from "./AddTask";
import Accordion from "./accordion/Accordion";
import Columns from "./Columns";

const Task = ({ state, category, dispatch }) => {
  const [dragging, setDragging] = useState(false);
  const [focus, setFocus] = useState(false);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const todosNestedInCategory = nested(state.categorys, state.newTodos);
  const currCategory = todosNestedInCategory.find(
    (item) => item.id === category.id
  );

  useEffect(() => {
    dispatch({
      type: "updateColumns",
      payload: { currCategory: currCategory },
    });
  }, [state.newTodos]);

  const handletDragStart = (e, item) => {
    setDragging(true);
    dragItem.current = item;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);

    setTimeout(() => setDragging(true), 0);
  };

  const handleDragEnter = (event, targetItem) => {
    const currentItem = dragItem.current;
    const newList = [...state.columns];

    if (dragItemNode.current !== event.target) {
      const sourceTasks = newList[currentItem.columnIndex].todos;
      const targetTasks = newList[targetItem.columnIndex].todos;

      const [removed] = sourceTasks.splice(currentItem.todoIndex, 1);
      targetTasks.splice(targetItem.todoIndex, 0, removed);
      dragItem.current = targetItem;

      dispatch({ type: "moveUpAndDown", payload: { category, newList } });
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
      dragItem.current.columnIndex === item.columnIndex &&
      dragItem.current.todoIndex === item.todoIndex
    ) {
      return `  bg-red-400 rounded-md border-l-8 pr-1`;
    }
    return ` bg-yellow-400 rounded-md border-l-8 pr-1`;
  };
  return (
    <div className=" flex flex-col flex-grow justify-between ">
      <TaskHeader
        state={state}
        category={category}
        currCategory={currCategory}
        dispatch={dispatch}
      />

      <div
        className="flex w-full items-start flex-grow "
        style={{ backgroundColor: currCategory?.color?.secondary }}
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
        />
      </div>
    </div>
  );
};
export default Task;
