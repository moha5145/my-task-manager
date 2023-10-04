import React from "react";
import Modal from "./modal/Modal";

const CreateCategory = ({ state, dispatch, apiUrl }) => {
  return (
    <Modal
      state={state}
      dispatch={dispatch}
      type={`create`}
      name={state.name}
      apiUrl={apiUrl}
    />
  );
};
export default CreateCategory;
