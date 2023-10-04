import React, { useState } from "react";
import { ColorLens } from "@mui/icons-material";

import Form from "./Form";
import ColoredButton from "../../../shared/buttons/ColoredButton";

export default function Modal({ state, dispatch, type, category, color, apiUrl }) {
  const [showModal, setShowModal] = useState(false);

  const onEdit = () => {
    setShowModal(true);
  };

  return (
    <>
      <ColoredButton
        text="Theme"
        Icon={ColorLens}
        backgroundColor={color}
        onClick={onEdit}
      />

      {showModal && (
        <div
          className=" items-center fixed flex z-50 outline-none focus:outline-none bg-black bg-opacity-25 inset-0 "
          id="wrapper"
          onClick={(e) => {
            e.target.id === "wrapper" && setShowModal(false);
          }}
        >
          <div className=" max-w-xs mx-auto z-50 ">
            <div
              className="border-2 rounded-lg z-50  outline-none focus:outline-none"
              style={{
                borderColor:
                  type === "edit"
                    ? state?.color?.primary || category?.color.primary
                    : state?.color?.primary || state.defaultColor.primary,
                backgroundColor:
                  type === "edit"
                    ? state?.color?.secondary || category?.color.secondary
                    : state?.color?.secondary || state.defaultColor.secondary,
              }}
            >
              <div className="p-2">
                <Form
                  setShowModal={setShowModal}
                  state={state}
                  dispatch={dispatch}
                  type={type}
                  category={category}
                  color={color}
                  apiUrl={apiUrl}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
