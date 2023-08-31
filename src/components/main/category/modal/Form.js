import React, { useState } from "react";
import slugify from "react-slugify";
import { uid } from "uid";
import { Link } from "react-router-dom";
import { Save, Backspace } from "@mui/icons-material";
// import BackspaceIcon from "@mui/icons-material/Backspace";

import FlatButton from "../../../shared/buttons/FlatButton";
import ColoredButton from "../../../shared/buttons/ColoredButton";
import CustomInput from "../../../shared/inputs/CustomInput";
import ColorTable from "../../tasks/modal/ColorTabel";

const Form = ({ state, category, dispatch, setShowModal, type }) => {
  const [showColors, setShowColors] = useState(false);

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
      color: state.color || category?.color,
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

  const show = (e) => {
    e.preventDefault();
    setShowColors(true);
  };

  const getOutlineColor = () => {
    return type === "edit"
      ? state?.color?.primary || category?.color.primary
      : state?.color?.primary || state.defaultColor.primary;
  };

  const outlineColor = getOutlineColor();
  const slug = slugify(state?.name);
  const bgColor = () => {
    const prColor = category?.color?.primary;
    if (!prColor || prColor === "#808080") return "#62C188";
    return prColor;
  };

  return (
    <form>
      {!showColors ? (
        <div>
          <div className="pr-2">
            <span>Nom de la liste</span>

            <CustomInput
              placeholder="Nom de la liste"
              autoFocus={true}
              state={state}
              dispatch={dispatch}
              category={category}
              defaultValue={type === "edit" ? category?.name : state.name}
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
              backgroundColor={bgColor()}
              text={type === "edit" ? "Valider" : "créer une liste"}
              onClick={show}
              as={Link}
              to={`/${slug}`}
              Icon={Save}
            />
          </div>
        </div>
      ) : (
        <div>
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
              backgroundColor={state?.color?.primary || "#62C188"}
              text="Valider"
              onClick={onSubmit}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
