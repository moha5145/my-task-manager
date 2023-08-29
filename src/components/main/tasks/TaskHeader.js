import React from "react";
import { useNavigate } from "react-router-dom";

import { Delete, Save, ArrowBack } from "@mui/icons-material";

import FlatButton from "../../custom/buttons/FlatButton";
import ColoredButton from "../../custom/buttons/ColoredButton";
import Modal from "./modal/Modal";

import { activeSaveButton } from "../../Reducer";

const TasksHeader = ({ state, category, dispatch, type }) => {
  // console.log("category from TasksHeader", category);
  const navigate = useNavigate();
  const isSaveButtonActive = activeSaveButton(state, category);

  const saveTodos = (event) => {
    event.preventDefault();
    dispatch({ type: "saveTodos", payload: category });
  };

  return (
    <div className="flex flex-wrap w-full justify-between items-center py-4 gap-2 px-2">
      <div className="flex gap-2">
        <FlatButton
          Icon={ArrowBack}
          text="Retour"
          color={`${category?.color?.primary} || #22c55e`}
          onClick={(e) => {
            saveTodos(e);
            navigate(-1);
          }}
        />

        <ColoredButton
          disabled={isSaveButtonActive}
          text="Sauvegarder"
          Icon={Save}
          backgroundColor={isSaveButtonActive ? "#dddbdb" : "#22c55e"}
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
        />
        <FlatButton
          text="Supprimer"
          color="#ef4444"
          Icon={Delete}
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
