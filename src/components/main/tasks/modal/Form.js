import React, { useEffect } from "react";
import slugify from "react-slugify";
import { uid } from "uid";
import SaveIcon from "@mui/icons-material/Save";
import BackspaceIcon from "@mui/icons-material/Backspace";

import ColorTable from "./ColorTabel";
import FlatButton from "../../../custom/buttons/FlatButton";
import ColoredButton from "../../../custom/buttons/ColoredButton";

const Form = ({ state, category, dispatch, setShowModal, type }) => {
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
  useEffect(() => {
    // console.log("category", category);
  }, [category]);
  return (
    <form>
      <div className="block mt-2 mb-3">
        <ColorTable state={state} dispatch={dispatch} />
      </div>

      <div className="flex gap-2 text-xl font-bold justify-between mx-1">
        <FlatButton
          Icon={BackspaceIcon}
          state={state}
          category={type === "edit" ? category : null}
          dispatch={dispatch}
          text="Annuler"
          onClick={onCancel}
          color="red"
        />
        <ColoredButton
          Icon={SaveIcon}
          backgroundColor="#62C188"
          text="Valider"
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default Form;
