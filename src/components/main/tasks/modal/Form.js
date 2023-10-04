import React from "react";
import { Save, Backspace } from "@mui/icons-material";

import ColorTable from "./ColorTabel";
import FlatButton from "../../../shared/buttons/FlatButton";
import ColoredButton from "../../../shared/buttons/ColoredButton";
import axios from "axios";

const Form = ({ state, category, dispatch, setShowModal, type, color, apiUrl }) => {
  const onCancel = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const categoryToUpdate = {
      _id: category?._id,
      name: category.name,
      slug: category.slug,
      color: state.color || category?.color,
    };

    const response = await axios.put(`${apiUrl}/category/update`, categoryToUpdate)

    dispatch({ type: "updateCategory", payload: response.data });
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
