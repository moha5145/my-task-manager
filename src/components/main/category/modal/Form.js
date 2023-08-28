import React from "react";
import slugify from "react-slugify";
import { uid } from "uid";
import { Link } from "react-router-dom";
import { Save, Backspace } from "@mui/icons-material";
// import BackspaceIcon from "@mui/icons-material/Backspace";

import FlatButton from "../../../custom/buttons/FlatButton";
import ColoredButton from "../../../custom/buttons/ColoredButton";
import CustomInput from "../../../custom/inputs/CustomInput";

const Form = ({ state, category, dispatch, setShowModal, type }) => {
  const onCancel = () => {
    setShowModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const categoryId = uid();
    const updatePayload = {
      id: category?.id || categoryId,
      name: state.name || category?.name,
      slug: slugify(category?.name),
      type: type,
      columns: category?.columns || [],
      todos: category?.todos || [],
    };

    dispatch({ type: "updateCategory", payload: updatePayload });

    dispatch({
      type: "addIntialColumns",
      payload: {
        todo: {
          id: uid(),
          categoryId,
          title: "todo",
          color: "red",
          taskTitle: "",
          showMenu: false,
          columns: [],
          todos: [],
        },
        inProgress: {
          id: uid(),
          categoryId,
          title: "inProgress",
          color: "orange",
          taskTitle: "",
          showMenu: false,
          todos: [],
        },
        completed: {
          id: uid(),
          categoryId,
          title: "completed",
          color: "lightgreen",
          taskTitle: "",
          showMenu: false,
          todos: [],
        },
      },
    });

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
          Icon={Backspace}
        />

        <ColoredButton
          backgroundColor="#62C188"
          text={type === "edit" ? "Valider" : "créer une liste"}
          onClick={onSubmit}
          as={Link}
          to={`/${slug}`}
          Icon={Save}
        />
      </div>
    </form>
  );
};

export default Form;
