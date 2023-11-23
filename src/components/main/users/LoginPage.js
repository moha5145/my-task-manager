import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from './Input';

const LoginPage = ({apiUrl, setUser, state, dispatch}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        email,
        password
      })

      const { userName, token, userId} = response.data
      switch (response.data.message) {
        case "login successful":
          setUser(userName, email, token, userId)
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
    <div className='w-full flex flex-col justify-center'>
      <h2 className='text-2xl font-bold my-4 text-center'>Accéder à votre espace</h2>
      <form
        onSubmit={login}
        className='flex flex-col gap-3'>

        <Input setValue={setEmail} value={email} type="email" placeholder="Votre email"/>
        <Input setValue={setPassword} value={password} type="password" placeholder="Votre mot de passe"/>

        <button type='submit'
          className='border-2 rounded-md p-2 bg-[#62C188] text-white hover:opacity-80'>
          Se connecter
        </button>
      
        <p className='flex justify-between'>
          Vous avez pas de compte ?
          <span className='text-[#62C188] cursor-pointer'>
            <Link to="/signup">
              S'inscrire
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
