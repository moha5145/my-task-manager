import React, { useEffect } from "react";

import Category from "../components/main/category/Category";
import CreateCategory from "../components/main/category/CreateCategory";
import Test from "./Test";
// import Test from "./Test";
// import { getCategoriesAndTodos, nested } from "../components/Reducer";

const Home = ({ state, categorys, dispatch, showModal, setShowModal }) => {
  // const categoriesAndTodos = getCategoriesAndTodos(state);
  // console.log("categoriesAndTodos", categoriesAndTodos);
  // const chala = nested(categoriesAndTodos);
  // console.log("chala", chala);

  // const chala = nested(state.categorys, state.newTodos);
  // console.log("nested(state.categorys, state.newTodos)", categorys);

  return (
    <div className="mx-2">
      <div className="flex flex-wrap justify-center">
        <CreateCategory
          state={state}
          dispatch={dispatch}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        {categorys.map((category, index) => (
          <div key={category.id} className="m-2 w-full sm:w-60">
            <Category
              category={category}
              state={state}
              dispatch={dispatch}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        ))}
      </div>
      {/* <Test /> */}
    </div>
  );
};
export default Home;
