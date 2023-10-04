import React, { useState } from "react";
import axios from "axios";
import { MoreVert, ModeEdit, Delete } from "@mui/icons-material";

import { notify } from "../../Reducer";

import IconButton from "../../shared/buttons/IconButton";
import AddEditColumn from "../../shared/AddEditColumn";
import FlatButton from "../../shared/buttons/FlatButton";

const ColHeader = ({ column, category, dispatch, columnIndex, apiUrl }) => {
  const [columnName, setColumnName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const onUpdateColumn = async () => {
    const currName = column?.title;
    const todosIds = column?.todos.map((todo) => todo._id)

    const payload = {
      column: { _id: column?._id, title: columnName || column.title },
      todosIds
    }

    const response = await axios.put(`${apiUrl}/column/update`, payload)
    dispatch({
      type: "updateColumnName",
      payload: { _id: column._id, title: response.data.title},
    });
    
    dispatch({
      type: "updateStatus",
      payload: { todos: column.todos, title: columnName },
    });

    dispatch({
      type: "showMenu",
      payload: { showMenu: !column.showMenu, columnIndex, column },
    });

    if (columnName !== column?.title) {
      notify(
        `${currName.toUpperCase()} est remplacé par ${columnName.toUpperCase()} avec succès !`,
        "success"
      );
    } else notify(`La colonne ${columnName} n'est pas modifié !`, "info");
  };

  const onDelteColumn = async () => {
    const response = await axios.post(`${apiUrl}/column/delete`, column);
    dispatch({
      type: "deleteColumn",
      payload:  {data: response.data, column} ,
    });
  }
  return (
    <div className="w-full relative inline-block text-left">
      <div
        className={`flex relative max-h-[40px] items-center justify-between text-white text-lg rounded-md p-2 uppercase my-3`}
        style={{ backgroundColor: category?.color?.primary }}
      >
        {column.title}
        <IconButton
          Icon={MoreVert}
          onClick={() => {
            dispatch({
              type: "showMenu",
              payload: { showMenu: !column.showMenu, columnIndex, column },
            });
          }}
          color="white"
        />
      </div>
      {column.showMenu ? (
        <div
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white 
          shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="flex flex-col w-full p-1 gap-2 " role="none">
            <AddEditColumn
              dispatch={dispatch}
              column={column}
              category={category}
              Icon={ModeEdit}
              fontSize="medium"
              text="Modifier"
              color={category?.color?.primary}
              setColumnName={setColumnName}
              columnName={columnName}
              showInput={showInput}
              setShowInput={setShowInput}
              placeholder="Edit column title"
              onKeyUp={(e) => {
                e.preventDefault();
                if (e.key === "Enter") {
                  if (e.target.value.length >= 3) {
                    onUpdateColumn(e);
                  } else {
                    notify("Minimum 3 characters !", "error");
                  }
                }
              }}
              onClick={() => {
                onUpdateColumn();
              }}
            />

            <FlatButton
              Icon={Delete}
              text="Suprimer"
              color="red"
              onClick={() => {
                onDelteColumn();
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ColHeader;
