import React from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FlatButton from "../../custom/buttons/FlatButton";
import ColoredButton from "../../custom/buttons/ColoredButton";
import Modal from "./modal/Modal";

import { activeSaveButton } from "../../Reducer";

const TasksHeader = ({ state, category, currCategory, dispatch, type }) => {
  const navigate = useNavigate();
  const isSaveButtonActive = activeSaveButton(state, currCategory || category);

  const saveTodos = (event) => {
    event.preventDefault();
    dispatch({ type: "saveTodos", payload: currCategory || category });
  };

  return (
    <div className="flex flex-wrap w-full justify-between items-center py-4 gap-2 px-2">
      <div className="flex gap-2">
        <FlatButton
          Icon={ArrowBackIcon}
          text="Retour"
          color="#22c55e"
          onClick={() => navigate(-1)}
        />

        <ColoredButton
          disabled={isSaveButtonActive}
          text="Sauvegarder"
          Icon={SaveIcon}
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
          category={currCategory}
        />
        <FlatButton
          text="Supprimer"
          color="#ef4444"
          Icon={DeleteIcon}
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
