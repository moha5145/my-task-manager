import "./App.css";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

import { init, reducer, nestCategories } from "./components/Reducer";

import Header from "./components/header";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// const apiUrl = "http://localhost:3000";
const apiUrl = "https://mytaskmanager-wylmfxh4.b4a.run";

function App() {
  const [state, dispatch] = useReducer(reducer, init);
  const [showModal, setShowModal] = useState(false);
  const [categorys, setCategorys] = useState(state.categorys);
  const [inviteMode, setInviteMode] = useState(true);
  
 const prevCategorysRef = useRef(state.categorys);

  const fetchData = useCallback(async () => {
    const userId = state.user?.userId || null
    dispatch({ type: 'isLoading', payload: true })

    if (userId) {
      const response = await axios.get(`${apiUrl}/categories/${userId}`);
      const data = response.data
      dispatch({
        type: "initialData",
        payload: {
          allCategories: data.allCategories,
          allColumns: data.allColumns, 
          allTodos: data.allTodos, 
          isLoading: false 
        }
      });
    }
    dispatch({ type: 'isLoading', payload: false });
    dispatch({ type: "copyTodos" });
  },[state.user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (prevCategorysRef.current?.length !== state.categorys?.length) {
      fetchData();
    }
    //   // Update the ref with the current state.categorys
    prevCategorysRef.current = state.categorys;
    setCategorys( nestCategories(state.categorys, state.todos, state.columns));
      }, [state.categorys, state.columns, state.todos]);
  

  const setUser = (userName, email, userToken, userId) => {
    if (userToken) {
      Cookies.set("userName", userName);
      Cookies.set("email", email);
      Cookies.set("userToken", userToken);
      Cookies.set("userId", userId);
      dispatch({ type: "setUser", payload: { userName, email, userToken, userId } });
    } else {
      Cookies.remove("userName");
      Cookies.remove("email");
      Cookies.remove("userToken");
      Cookies.remove("userId");
      dispatch({ type: "setUser", payload: {}});
    }
  }

  return (
    <Theme>
      <Router>
        <div className="flex flex-col h-screen">
          <Header
            setUser={setUser}
            state={state}
            setInviteMode={setInviteMode}
            inviteMode={inviteMode}
          />
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

            <Route
              path="/signup"
              element={<Signup state={state} dispatch={dispatch} apiUrl={apiUrl} setUser={setUser} />}
            />

            <Route
              path="/login"
              element={<Login state={state} dispatch={dispatch} apiUrl={apiUrl} setUser={setUser} />}
            />
          </Routes>
        </div>
      </Router>
    </Theme>
  );
}

export default App;
