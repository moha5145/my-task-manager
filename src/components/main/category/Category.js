import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Delete, Edit, Launch } from "@mui/icons-material";

import Modal from "./modal/Modal";
import FlatButton from "../../shared/buttons/FlatButton";

const Category = ({ category, state, dispatch, apiUrl }) => {
  const onDeleteCategory = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiUrl}/category/delete`, category)
    dispatch({ type: "deleteCategory", payload: response.data });
  };

  const primaryColor = category?.color?.primary || state.defaultColor.primary;

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
          <Launch />
          <span> voir </span>
        </Link>
      </div>
      <div className="flex gap-2 font-bold text-2xl mx-4">
        <Modal
          Icon={Edit}
          state={state}
          dispatch={dispatch}
          type="edit"
          category={category}
          name={category.name}
          apiUrl={apiUrl}
        />

        <FlatButton
          Icon={Delete}
          color="#ff0000"
          text="Suprimer"
          onClick={onDeleteCategory}
        />
      </div>
    </div>
  );
};
export default Category;
