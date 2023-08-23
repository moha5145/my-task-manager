import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/Home";
import Footer from "./components/footer";
import { useEffect, useReducer, useState } from "react";

import { init, reducer, nested } from "./components/Reducer";
import Tasks from "./pages/Tasks";

function App() {
  const [state, dispatch] = useReducer(reducer, init);
  const [showModal, setShowModal] = useState(false);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    dispatch({ type: "copyTodos" });
  }, []);

  useEffect(() => {
    setCategorys(nested(state.categorys, state.newTodos));
  }, [state.categorys, state.newTodos]);

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
          {/* <Route
          path="/create"
          element={<Tasks state={state} dispatch={dispatch} />}
        /> */}
          <Route
            path="/:slug"
            element={<Tasks state={state} dispatch={dispatch} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
