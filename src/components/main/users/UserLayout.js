import React from 'react';
import { useLocation } from "react-router";

import LoginPage from './LoginPage';
import Divider from './Divider';
import ModeTest from './ModeTest';
import SignupPage from './SignupPage';

const UserLayout = ({dispatch, apiUrl, state, setUser}) => {

  const location = useLocation()
  return (
    <section className='flex flex-col md:flex md:flex-row h-screen justify-center items-center py-16 bg-red'>
      <div className='w-full flex justify-center items-center px-4 md:px-8'>
        {location.pathname === "/login" ? 
          <LoginPage
            apiUrl={apiUrl}
            setUser={setUser}
            state={state}
            dispatch={dispatch}
          />: 
          <SignupPage
            apiUrl={apiUrl}
            state={state}
            dispatch={dispatch}
            setUser={setUser}
          />
        }
      </div>

      <Divider />

      <ModeTest dispatch={dispatch} />
    </section>
  );
};
export default UserLayout;
