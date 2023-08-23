import React, { useState } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import Form from "./Form";
import FlatButton from "../../../custom/buttons/FlatButton";
import ColoredButton from "../../../custom/buttons/ColoredButton";

export default function Modal({ state, dispatch, type, category }) {
  const [showModal, setShowModal] = useState(false);

  const onEdit = () => {
    setShowModal(true);
  };

  return (
    <>
      <ColoredButton
        text="Theme"
        Icon={ColorLensIcon}
        backgroundColor="#22c55e"
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
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
