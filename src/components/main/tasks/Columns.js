import React, { useRef, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import Accordion from "./accordion/Accordion";
import AddTask from "./AddTask";
import AddColumn from "./AddColumn";
import IconButton from "../../custom/buttons/IconButton";
import ColHeader from "./ColHeader";

const Column = ({
  state,
  category,
  dispatch,
  dragging,
  focus,
  setFocus,
  priorityStyle,
  handleDragEnter,
  handletDragStart,
  getStyles,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-wrap md:h-full py-2 justify-center items-start lg:px-16 ">
      {state.columns.map((column, columnIndex) => {
        return (
          <div
            className="flex flex-col w-full h-full sm:w-1/2 md:w-auto border px-2 gap-2 "
            key={column.title}
            onDragEnter={
              dragging && !column.todos.length
                ? (e) => handleDragEnter(e, { columnIndex, todoIndex: 0 })
                : null
            }
          >
            <ColHeader
              column={column}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              dispatch={dispatch}
              columnIndex={columnIndex}
            />

            <AddTask
              column={column}
              category={category}
              state={state}
              dispatch={dispatch}
              focus={focus}
              setFocus={setFocus}
              status={column.title}
              autoFocus={columnIndex === 0}
              value={state.columns[columnIndex].taskTitle}
              columnIndex={columnIndex}
            />
            {column.todos?.map((todo, todoIndex) => {
              const border = priorityStyle(todo);

              return (
                <div
                  draggable
                  key={todo.id}
                  className={
                    dragging
                      ? getStyles({ columnIndex, todoIndex })
                      : ` rounded-lg w-full border-l-8 cursor-grab active:cursor-grabbing bg-white pr-1`
                  }
                  style={{
                    borderColor: border,
                  }}
                  onDragStart={(e) =>
                    handletDragStart(e, { columnIndex, todoIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, { columnIndex, todoIndex });
                        }
                      : null
                  }
                  id={column.title}
                >
                  <div className="">
                    <Accordion
                      todo={todo}
                      category={category}
                      index={todoIndex}
                      dispatch={dispatch}
                      state={state}
                      focus={focus}
                      setFocus={setFocus}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <AddColumn dispatch={dispatch} />
    </div>
  );
};

export default Column;
