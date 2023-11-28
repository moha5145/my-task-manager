import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from './Input';
import { notify } from '../../Reducer';

const SignupPage = ({apiUrl, setUser}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate()

  const passwordsDontMatch = password !== confirmPassword;
  const fieldIsEmpty = userName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0
  const emailIsNotValid = !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  
  const onSignup = async (e) => {
    e.preventDefault()
    try {
      if (emailIsNotValid) {
        notify('Email invalide', 'error')
        return
      }
      if (passwordsDontMatch) {
        notify('Les mots de passes ne sont pas identiques', 'error')
        return
      }

      const response = await axios.post(`${apiUrl}/users/signup`, {
        userName,
        email,
        password,
      })

      const { token, userId} = response.data
      switch (response.data.message) {
        case "user successfully created":
          setUser(userName, email, token, userId)
          notify('Utilisateur creé avec succès', 'success')
          navigate("/")
          break;
        case "User already exists":
          notify('Utilisateur existant', 'error')
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('error.message', error.message)
    }
  } 

  return (
    <div className='w-full flex flex-col justify-center'>
      <h2 className='text-2xl font-bold my-4 text-center'>Créer un compte</h2>

      <form 
        onSubmit={onSignup}
        className='flex flex-col gap-3 '  
        >
        <Input setValue={setUserName} value={userName} type="text" placeholder="Nom d'utilisateur"/>

        <Input setValue={setEmail} value={email} type="email" placeholder="Votre email"/>

        <Input setValue={setPassword} value={password} type="password" placeholder="Votre mot de passe"/>

        <Input setValue={setConfirmPassword} value={confirmPassword} type="password" placeholder="Confirmez votre mot de passe"/>
         
        <button 
          type='submit' 
          className={`border-2 rounded-md p-2 text-white bg-[#62C188] ${fieldIsEmpty ? 'opacity-50 cursor-not-allowed' : "hover:opacity-80"}`
        } 
          disabled={fieldIsEmpty}
          >
            S'inscrire 
        </button>
      
        <p 
          className='flex justify-between'> 
          Avez vous déja un compte ? 
          <span className='text-[#62C188] cursor-pointer'>
            <Link to="/login">
                S'identifier 
            </Link> 
          </span> 
        </p>
      </form>
    </div>
  );
};
export default SignupPage;
