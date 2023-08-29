import React from "react";
import Modal from "./modal/Modal";

const CreateCategory = ({ state, dispatch }) => {
  return <Modal state={state} dispatch={dispatch} type={`create`} />;
};
export default CreateCategory;