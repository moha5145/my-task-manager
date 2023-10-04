import React from "react";

import Category from "../components/main/category/Category";
import CreateCategory from "../components/main/category/CreateCategory";
import Footer from "../components/footer";

const Home = ({ state, categorys, dispatch, showModal, setShowModal ,isLoading, apiUrl }) => {

  return (
    <div className="mx-2">
      <div className="flex flex-wrap justify-center">
        <CreateCategory
          state={state}
          dispatch={dispatch}
          showModal={showModal}
          setShowModal={setShowModal}
          apiUrl={apiUrl}
        />
        {categorys.length > 0 && categorys.map((category) => {
          return (
            <div key={category._id} className="m-2 w-full sm:w-60">
              <Category
                category={category}
                state={state}
                dispatch={dispatch}
                showModal={showModal}
                setShowModal={setShowModal}
                apiUrl={apiUrl}
              />
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
};
export default Home;
