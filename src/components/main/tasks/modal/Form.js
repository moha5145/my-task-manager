import React from "react";
import { Save, Backspace } from "@mui/icons-material";

import ColorTable from "./ColorTabel";
import FlatButton from "../../../shared/buttons/FlatButton";
import ColoredButton from "../../../shared/buttons/ColoredButton";

const Form = ({ state, category, dispatch, setShowModal, type, color }) => {
  const onCancel = () => {
    setShowModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const updatePayload = {
      id: category?.id,
      color: state.color || category?.color,
      type: "edit",
    };

    dispatch({ type: "updateCategory", payload: updatePayload });
    setShowModal(false);
  };

  return (
    <form>
      <div className="block mt-2 mb-3">
        <ColorTable state={state} dispatch={dispatch} />
      </div>

      <div className="flex gap-2 text-xl font-bold justify-between mx-1">
        <FlatButton
          Icon={Backspace}
          state={state}
          category={type === "edit" ? category : null}
          dispatch={dispatch}
          text="Annuler"
          onClick={onCancel}
          color="red"
        />
        <ColoredButton
          Icon={Save}
          backgroundColor={color}
          text="Valider"
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default Form;
