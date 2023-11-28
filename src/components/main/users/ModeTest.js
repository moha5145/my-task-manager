import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import { notify } from '../../Reducer';

const ModeTest = ({dispatch, apiUrl, setUser}) => {
  const navigate = useNavigate()
  
  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        email: "test@test.com",
        password: "test"
      })

      dispatch({ type: "testMode", payload: true })

      const { userName, token, userId} = response.data
      switch (response.data.message) {
        case "login successful":
          setUser(userName, "test@test.com", token, userId)
          notify('Connexion en mode tester', 'success')
          navigate("/")
          break;
        default:
          break;
      }
      
    } catch (error) {
      console.log('error.message', error.message)
    }
  };
  return (
    <div className='w-full flex justify-center items-center px-4 md:px-8 pb-10'>
        <div className='w-full flex flex-col gap-5 justify-between'> 
          <h2 className='text-2xl font-bold text-center'>
            Testez sans inscription
          </h2> 
          <button 
            className='bg-[#62C188] text-white p-2 rounded-md hover:opacity-80' 
            onClick={(e) => {
              login(e)
            }}>
              Tester
          </button> 
        </div>
      </div>
  );
};
export default ModeTest;
