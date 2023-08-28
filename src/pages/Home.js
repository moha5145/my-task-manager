import React, { useEffect } from "react";

import Category from "../components/main/category/Category";
import CreateCategory from "../components/main/category/CreateCategory";
import Test from "./Test";

const Home = ({ state, categorys, dispatch, showModal, setShowModal }) => {
  return (
    <div className="mx-2">
      <div className="flex flex-wrap justify-center">
        <CreateCategory
          state={state}
          dispatch={dispatch}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        {categorys?.map((category, index) => {
          return (
            <div key={category.id} className="m-2 w-full sm:w-60">
              <Category
                category={category}
                state={state}
                dispatch={dispatch}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
          );
        })}
      </div>
      {/* <Test /> */}
    </div>
  );
};
export default Home;
