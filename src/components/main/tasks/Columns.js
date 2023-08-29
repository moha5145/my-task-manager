import React, { useRef, useState } from "react";

import Accordion from "./accordion/Accordion";
import AddTask from "./AddTask";
import AddColumn from "./AddColumn";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:h-full py-2 justify-center items-start md:pr-12">
      {category.columns.map((column, columnIndex) => {
        console.log("column form Column", column);
        return (
          <div
            className="col-span-1  h-full overflow-y-auto  border px-2 gap-2 "
            key={column.id}
            onDragEnter={
              dragging && !column.todos.length
                ? (e) =>
                    handleDragEnter(
                      e,
                      { columnIndex, todoIndex: 0 },
                      category.columns
                    )
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
                      : ` rounded-lg w-full border-l-8 cursor-grab active:cursor-grabbing bg-white pr-1 mb-2`
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
                          handleDragEnter(
                            e,
                            { columnIndex, todoIndex },
                            category.columns
                          );
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
      <AddColumn dispatch={dispatch} category={category} />
    </div>
  );
};

export default Column;