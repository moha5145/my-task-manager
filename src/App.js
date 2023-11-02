import "./App.css";
import { Theme } from '@radix-ui/themes';
import { useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { init, reducer, nestCategories } from "./components/Reducer";

import Header from "./components/header";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

const apiUrl = "http://localhost:3000";
// const apiUrl = "https://mytaskmanager-wylmfxh4.b4a.run";

function App() {
  const [state, dispatch] = useReducer(reducer, init);
  const [showModal, setShowModal] = useState(false);
  const [categorys, setCategorys] = useState(state.categorys);
  
 const prevCategorysRef = useRef(state.categorys);
 const fetchData = async () => {
    dispatch({ type: 'isLoading', payload: true });
    const response = await axios.get(`${apiUrl}/categories`);
    const data = response.data
    dispatch({
      type: "initialData",
      payload: { allCategories: data.allCategories, allColumns: data.allColumns, allTodos: data.allTodos, isLoading: false }
    });
    dispatch({ type: 'isLoading', payload: false });
    dispatch({ type: "copyTodos" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (prevCategorysRef.current?.length !== state.categorys?.length) {
      fetchData();
    }
    //   // Update the ref with the current state.categorys
    prevCategorysRef.current = state.categorys;
    setCategorys( nestCategories(state.categorys, state.todos, state.columns));
  }, [state.categorys, state.columns, state.todos]);
  
  return (
    <Theme>
      <Router>
        <div className="flex flex-col h-screen">
          <Header />
          <ToastContainer />
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
                    isLoading={state.isLoading}
                    setCategorys={setCategorys}
                    apiUrl={apiUrl}
                  />
                }
              />

            { categorys.length > 0 && categorys?.map((category, index) => (
              <Route
                key={category._id}
                path={`/${category.slug}`}
                element={<Tasks state={state} category={category} dispatch={dispatch} setCategorys={setCategorys} apiUrl={apiUrl}/>}
              />
            ))}
          </Routes>
        </div>
      </Router>
    </Theme>
  );
}

export default App;
