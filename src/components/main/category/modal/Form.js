import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import slugify from "react-slugify";
import { Save, Backspace } from "@mui/icons-material";

import { notify } from "../../../Reducer";

import FlatButton from "../../../shared/buttons/FlatButton";
import ColoredButton from "../../../shared/buttons/ColoredButton";
import CustomInput from "../../../shared/inputs/CustomInput";
import ColorTable from "../../tasks/modal/ColorTabel";

const Form = ({ state, category, dispatch, setShowModal, type, name, apiUrl }) => {
  const [showColors, setShowColors] = useState(false);
  const [newName, setNewName] = useState(name);
  const navigate = useNavigate();
  const slug = slugify(newName || category?.name);

  const onCancel = () => {
    setShowModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'isLoading', payload: true });
    const newCategory = {
      name,
      color: state.color || state.defaultColor,
      slug: slug,
      userId: state.user.userId,
      columns: [],
    }
    const response = await axios.post(`${apiUrl}/category/create`, newCategory)
  
    dispatch({ type: "createCategory", payload: response.data});
    dispatch({ type: 'isLoading', payload: false });

    state.isLoading ? <p>Loading ...</p> : navigate(`/${response.data.slug}`)
  };

  const onUpdateCategory = async (e) => {
    e.preventDefault();
    const categoryToUpdate = {
      _id: category._id,
      name: newName,
      slug: slugify(newName),
      color: state.color,
    }

    const response = await axios.put(`${apiUrl}/category/update`, categoryToUpdate)
    
    dispatch({ type: "updateCategory", payload: response.data});
    setShowModal(false);
  }

  const show = (event) => {
    event.preventDefault();
    if (newName) {
      setShowColors(true);
    } else {
      notify("Veuillez renseigner le nom de la liste", "error");
    }
  };

  const getOutlineColor = () => {
    return type === "edit"
      ? state?.color?.primary || category?.color.primary
      : state?.color?.primary || state.defaultColor.primary;
  };

  const outlineColor = getOutlineColor();
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
              type={type}
              className="p-2 w-full rounded-md peer outline m-1 mb-3"
              style={{
                outline: `2px solid ${outlineColor}`,
              }}
              onChange={(event) => {
                setNewName(event.target.value);
                dispatch({ type: "categoryName", payload: event.target.value });
              }}
              defaultValue={newName}
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
              text="Valider"
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
              onClick={type === "edit" ? onUpdateCategory : onSubmit}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
