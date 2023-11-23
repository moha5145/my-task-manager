import React from 'react';

import UserLayout from '../components/main/users/UserLayout';
const Login = ({ apiUrl, setUser, state, dispatch }) => {
  return (
    <>
      <UserLayout
        apiUrl={apiUrl}
        setUser={setUser}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
};
export default Login;
