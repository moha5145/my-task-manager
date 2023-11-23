import React from 'react';
import { useNavigate } from 'react-router';

const ModeTest = ({dispatch}) => {
  const navigate = useNavigate()
  
  return (
    <div className='w-full flex justify-center items-center px-4 md:px-8 pb-10'>
        <div className='w-full flex flex-col gap-5 justify-between'> 
          <h2 className='text-2xl font-bold text-center'>
            Testez sans inscription
          </h2> 
          <button 
            className='bg-[#62C188] text-white p-2 rounded-md hover:opacity-80' 
            onClick={() => {
              dispatch({ type: "testMode", payload: true })
              navigate("/")
            }}>
              Tester
          </button> 
        </div>
      </div>
  );
};
export default ModeTest;
