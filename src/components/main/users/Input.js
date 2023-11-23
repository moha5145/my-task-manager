import React from 'react';

const Input = ({value, setValue, type, placeholder}) => {
  return (
    <input
        type={type}
        placeholder={placeholder}
        className='border-2 rounded-md p-2 outline-[#62C188]'
        onChange={(e) => {
        e.preventDefault()
        setValue(e.target.value)
        }}
        value={value}
    />
  );
};
export default Input;
