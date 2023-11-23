import React, { useState } from "react";

import Form from "./Form";
import ColoredButton from "../../../shared/buttons/ColoredButton";
import { useNavigate } from "react-router";

export default function Modal({ state, dispatch, type, category, Icon, name, apiUrl }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onEdit = () => {
    setShowModal(true);
  };

  const renderEditButton = () => {
    return (
      <ColoredButton
        Icon={Icon}
        state={state}
        category={category}
        dispatch={dispatch}
        text="Editer"
        onClick={onEdit}
        backgroundColor={category?.color?.primary}
      />
    );
  };

  const renderNewListButton = () => {
    return (
      <div
        className="active:bg-[#62C188]-600 font-bold outline-none
        focus:outline-none ease-linear transition-all duration-150 
        flex flex-col justify-center h-40 sm:h-52 m-2 w-full sm:w-60 bg-[#62C188] 
        text-white text-center rounded-lg drop-shadow-2xl hover:opacity-70 text-2xl"
        type="button"
        onClick={() => {
          if(state.user.userToken) {
            setShowModal(true)
          } else {
            navigate("/login")
          }
        }}
      >
        <h2 className="text-4xl font-bold">+</h2>
        <h3 className="text-2xl font-bold">Nouvelle Liste</h3>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <div
        className=" items-center fixed flex z-50 outline-none focus:outline-none bg-black bg-opacity-25 inset-0 "
        id="wrapper"
        onClick={(e) => {
          e.target.id === "wrapper" && setShowModal(false);
        }}
      >
        <div className=" max-w-xs mx-auto z-50 ">
          <div
            className="mx-2 border-2 rounded-lg z-50  outline-none focus:outline-none"
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
                name={name}
                apiUrl={apiUrl}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {type === "edit" ? renderEditButton() : renderNewListButton()}
      {showModal ? renderModal() : null}
    </>
  );
}
