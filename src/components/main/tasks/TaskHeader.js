import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Delete, Save, ArrowBack } from "@mui/icons-material";

import { activeSaveButton, filterTodosByCategory, notify } from "../../Reducer";

import FlatButton from "../../shared/buttons/FlatButton";
import ColoredButton from "../../shared/buttons/ColoredButton";
import Modal from "./modal/Modal";

const TasksHeader = ({ state, category, dispatch, apiUrl }) => {
  const navigate = useNavigate();
  const isSaveButtonActive = activeSaveButton(state, category);

  const saveTodos = async (event) => {
    event.preventDefault();

    const hasEmptyTitle = state.todos.some(
      (todo) => todo.categoryId === category._id && todo?.title.length < 1
    );

    if (hasEmptyTitle) {
      notify("Veuillez renseigner un titre pour chaques tache", "error");
      return;
    }

    const updatedTodos = filterTodosByCategory(state.todos, category._id)
    .map((todo) => { return {...todo, isEditing: false}});
    
    const response = await axios.put(`${apiUrl}/todos/update/all`, {updatedTodos})

    dispatch({ type: "saveTodos", payload: {data: response.data, categoryId: category._id} });
  };

  const onDeleteCategory = async () => {
    const response = await axios.post(`${apiUrl}/category/delete`, category)
    dispatch({ type: "deleteCategory", payload: response.data });
  };

  const btnColor = category?.color?.primary || "#22c55e";
  return (
    <div className="sticky top-0 z-40 flex flex-wrap w-full justify-between items-center py-2 sm:py-4 gap-2 px-2 bg-white">
      <div className="flex gap-2">
        <FlatButton
          Icon={ArrowBack}
          text="Retour"
          color={btnColor}
          p={1}
          onClick={(e) => {
            navigate(-1);
          }}
        />

        <ColoredButton
          disabled={!isSaveButtonActive}
          displayText={false}
          text="Sauvegarder"
          Icon={Save}
          p={1}
          backgroundColor={!isSaveButtonActive ? "#dddbdb" : btnColor}
          onClick={saveTodos}
        />
      </div>
      <h3 className="text-2xl uppercase font-bold">
        {category?.name || state.name}
      </h3>

      <div className="flex gap-1  justify-center">
        <Modal
          state={state}
          dispatch={dispatch}
          type="edit"
          category={category}
          color={btnColor}
          apiUrl={apiUrl}
        />
        <FlatButton
          text="Supprimer"
          color="#ef4444"
          Icon={Delete}
          p={1}
          onClick={() => {
            onDeleteCategory()
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};
export default TasksHeader;
