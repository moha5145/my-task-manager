import React from "react";
import Modal from "./modal/Modal";

const CreateCategory = ({ state, dispatch, apiUrl, isLoading }) => {
  return (
    <Modal
      state={state}
      dispatch={dispatch}
      type={`create`}
      name={state.name}
      apiUrl={apiUrl}
      isLoading={isLoading}
    />
  );
};
export default CreateCategory;
