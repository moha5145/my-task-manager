import React, { useState } from "react";
import axios from "axios";
import { Add } from "@mui/icons-material";

import { notify } from "../../Reducer";

import Accordion from "./accordion/Accordion";
import AddTask from "./AddTask";
import AddEditColumn from "../../shared/AddEditColumn";
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
  apiUrl
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [showInput, setShowInput] = useState(false);

const onAddColumn = async (e) => {
  const newColumn = {
    categoryId: category._id,
    userId: state.user.userId,
    title: columnName,
    taskTitle: "",
    showMenu: false,
    todos: []
  };

  const response = await axios.post(`${apiUrl}/column/create`, newColumn);

  dispatch({
    type: "addNewColumn",
    payload: response.data,
  });

  notify(
    `Une nouvelle colonne (${columnName.toUpperCase()}) est ajouté  avec succès !`,
  );
  setColumnName("");
};

  return (
    <div
      className="w-full sm:flex flex-wrap justify-center
       py-2 md:pr-12"
    >
      {category?.columns.length > 0 && category?.columns.map((column, columnIndex) => {
        return (
          <div
            className="w-full sm:w-96 min-h-[300px] overflow-y-auto border px-2 gap-2 "
            key={column._id}
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
              apiUrl={apiUrl}
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
              apiUrl={apiUrl}
            />
            {column.todos?.map((todo, todoIndex) => {
              const border = priorityStyle(todo);

              return (
                <div
                  draggable
                  key={todo._id}
                  className={
                    dragging
                      ? getStyles({ columnIndex, todoIndex })
                      : ` rounded-lg w-full border-l-8 cursor-grab active:cursor-grabbing bg-white pr-1 mb-2`
                  }
                  style={{
                    borderColor: border,
                  }}
                  onDragStart={(e) =>
                    handletDragStart(e, { columnIndex, todoIndex }, category.columns)
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
                      column={column}
                      category={category}
                      index={todoIndex}
                      dispatch={dispatch}
                      state={state}
                      focus={focus}
                      setFocus={setFocus}
                      apiUrl={apiUrl}
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
          h={14}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key === "Enter") {
              if (e.target.value.length >= 3) {
                onAddColumn();
                setShowInput(false);
              } else {
                notify("Minimum 3 characters !", "error");
              }
            }
          }}
          onClick={onAddColumn}
        />
      </div>
    </div>
  );
};

export default Column;
