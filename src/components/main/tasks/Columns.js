import React, { useState } from "react";
import { Add } from "@mui/icons-material";

import { notify } from "../../Reducer";

import Accordion from "./accordion/Accordion";
import AddTask from "./AddTask";
import AddEditColumn from "../../shared/AddEditColumn";
import ColHeader from "./ColHeader";
import { uid } from "uid";

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
  const [columnName, setColumnName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const onAddColumn = () => {
    dispatch({
      type: "addNewColumn",
      payload: {
        id: uid(),
        categoryId: category.id,
        title: columnName,
        color: "lightgreen",
        taskTitle: "",
        showMenu: false,
        todos: [],
      },
    });
    notify(
      `Une nouvelle colonne (${columnName.toUpperCase()}) est ajouté  avec succès !`,
      "success"
    );
    setColumnName("");
  };

  return (
    <div
      className="w-full sm:flex flex-wrap justify-center
       py-2 md:pr-12"
    >
      {category.columns.map((column, columnIndex) => {
        return (
          <div
            className="w-full sm:w-96 min-h-[300px] overflow-y-auto border px-2 gap-2 "
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
              category={category}
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
      <div className="fixed bottom-[5.8%] right-2">
        <AddEditColumn
          dispatch={dispatch}
          category={category}
          Icon={Add}
          fontSize="large"
          shadow="shadow-xl"
          color={"orange"}
          setColumnName={setColumnName}
          showInput={showInput}
          setShowInput={setShowInput}
          columnName={columnName}
          placeholder="Add new column"
          p={6}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key === "Enter") {
              if (e.target.value.length >= 3) {
                onAddColumn(e);
                setShowInput(false);
              } else {
                notify("Minimum 3 characters !", "error");
              }
            }
          }}
          onClick={() => {
            onAddColumn();
          }}
        />
      </div>
    </div>
  );
};

export default Column;
