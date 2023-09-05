import "./App.css";
import { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

import { init, reducer, nestCategories } from "./components/Reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, init);
  const [showModal, setShowModal] = useState(false);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    dispatch({ type: "copyTodos" });
  }, []);

  useEffect(() => {
    setCategorys(
      nestCategories(state.categorys, state.newTodos, state.columns)
    );
  }, [state.categorys, state.newTodos, state.columns]);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                state={state}
                dispatch={dispatch}
                showModal={showModal}
                setShowModal={setShowModal}
                categorys={categorys}
              />
            }
          />

          {categorys?.map((category, index) => {
            return (
              <Route
                key={category.id}
                path={`/${category.slug}`}
                element={
                  <Tasks
                    state={state}
                    category={category}
                    dispatch={dispatch}
                  />
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
