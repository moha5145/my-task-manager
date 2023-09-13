import React from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Save, ArrowBack } from "@mui/icons-material";

import FlatButton from "../../shared/buttons/FlatButton";
import ColoredButton from "../../shared/buttons/ColoredButton";
import Modal from "./modal/Modal";

import { activeSaveButton, notify } from "../../Reducer";

const TasksHeader = ({ state, category, dispatch, type }) => {
  const navigate = useNavigate();
  const isSaveButtonActive = activeSaveButton(state, category);

  const saveTodos = (event) => {
    event.preventDefault();

    const hasEmptyTitle = state.newTodos.some(
      (todo) => todo.categoryId === category.id && todo?.title.length < 1
    );

    if (hasEmptyTitle) {
      notify("Veuillez renseigner un titre pour chaques tache", "error");
      return;
    }

    dispatch({ type: "saveTodos", payload: category });
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
            // !isSaveButtonActive && saveTodos(e);
            navigate(-1);
          }}
        />

        <ColoredButton
          disabled={isSaveButtonActive}
          text="Sauvegarder"
          Icon={Save}
          p={1}
          backgroundColor={isSaveButtonActive ? "#dddbdb" : btnColor}
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
        />
        <FlatButton
          text="Supprimer"
          color="#ef4444"
          Icon={Delete}
          p={1}
          onClick={() => {
            dispatch({ type: "deleteCategory", payload: category.slug });
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};
export default TasksHeader;
