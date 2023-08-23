import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Modal from "./modal/Modal";
import ColoredButton from "../../custom/buttons/ColoredButton";

const Category = ({ category, state, dispatch, showModal, setShowModal }) => {
  const onDelete = () => {
    dispatch({ type: "deleteCategory", payload: category.slug });
  };

  // console.log("chaltu", chala);
  // useEffect(() => {
  //   dispatch({ type: "copyCategory", payload: category && category });
  //   console.log("copy");
  // }, [dispatch, category]);

  const primaryColor = category.color.primary || state.defaultColor.primary;

  return (
    <div
      style={{ borderColor: primaryColor }}
      className="flex flex-col justify-around h-40 sm:h-52 sm:w-60 bg-[#EFF1F3] rounded-lg border hover:filter-none"
    >
      <div className="flex gap-2 mx-4 justify-between">
        <p className=" py-2">{category.name}</p>
        <Link
          to={`/${category.slug}`}
          state={{ category: category }}
          className="px-2 py-2 font-bold text-2xl hover:opacity-70"
          style={{ color: primaryColor }}
        >
          voir
        </Link>
      </div>
      <div className="flex gap-2 font-bold text-2xl mx-4">
        <Modal
          Icon={EditIcon}
          state={state}
          dispatch={dispatch}
          type="edit"
          category={category}
        />
        <ColoredButton
          Icon={DeleteIcon}
          backgroundColor={primaryColor}
          text="Suprimer"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};
export default Category;
