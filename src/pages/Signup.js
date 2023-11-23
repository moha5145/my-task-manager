import React from 'react';
import UserLayout from '../components/main/users/UserLayout';

const Signup = ({apiUrl, dispatch, state, setUser}) => {
  return (
    <>
      <UserLayout
        apiUrl={apiUrl}
        state={state}
        dispatch={dispatch}
        setUser={setUser}
      />
    </>
  );
};
export default Signup;
