import React from "react";
import slugify from "react-slugify";
import { uid } from "uid";
import SaveIcon from "@mui/icons-material/Save";
import BackspaceIcon from "@mui/icons-material/Backspace";

import FlatButton from "../../../custom/buttons/FlatButton";
import ColoredButton from "../../../custom/buttons/ColoredButton";
import { Link } from "react-router-dom";
import CustomInput from "../../../custom/inputs/CustomInput";

const Form = ({ state, category, dispatch, setShowModal, type }) => {
  const onCancel = () => {
    setShowModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const updatePayload = {
      id: category?.id || uid(),
      name: state.name || category?.name,
      slug: slugify(category?.name),
      type: type,
      todos: category?.todos || [],
    };

    dispatch({ type: "updateCategory", payload: updatePayload });

    setShowModal(false);
  };

  const getOutlineColor = () => {
    return type === "edit"
      ? state?.color?.primary || category?.color.primary
      : state?.color?.primary || state.defaultColor.primary;
  };

  const outlineColor = getOutlineColor();
  const slug = slugify(state?.name);
  return (
    <form>
      {/* <label> */}
      <div className="pr-2">
        <span>Nom de la liste</span>
        {/* <input
          onChange={(event) => {
            dispatch({ type: "categoryName", payload: event.target.value });
          }}
          defaultValue={type === "edit" ? category?.name : state.name}
          autoFocus
          type="text"
          placeholder="nom de la liste"
          className="p-2 w-full rounded-md peer outline m-1 mb-3"
          style={{
            outline: `2px solid ${outlineColor}`,
          }}
        /> */}
        <CustomInput
          placeholder="Nom de la liste"
          autoFocus={true}
          state={state}
          dispatch={dispatch}
          category={category}
          value={type === "edit" ? category?.name : state.name}
          type={type}
          className="p-2 w-full rounded-md peer outline m-1 mb-3"
          style={{
            outline: `2px solid ${outlineColor}`,
          }}
          onChange={(event) => {
            dispatch({ type: "categoryName", payload: event.target.value });
          }}
        />
      </div>
      {/* </label> */}

      <div className="flex gap-2 text-xl font-bold justify-between mx-1">
        <FlatButton
          state={state}
          category={type === "edit" ? category : null}
          dispatch={dispatch}
          text="Annuler"
          onClick={onCancel}
          color="red"
          Icon={BackspaceIcon}
        />

        <ColoredButton
          backgroundColor="#62C188"
          text={type === "edit" ? "Valider" : "créer une liste"}
          onClick={onSubmit}
          as={Link}
          to={`/${slug}`}
          Icon={SaveIcon}
        />
      </div>
    </form>
  );
};

export default Form;
