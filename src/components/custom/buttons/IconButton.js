import React, { useState } from "react";

const IconButton = ({
  onClick,
  color,
  Icon = null,
  disabled = false,
  link = "/",
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`border-none
        p-1 hover:opacity-40 
        rounded-lg  cursor-pointer`}
      onClick={onClick}
      to={link}
      style={{ color: color }}
    >
      <Icon />
    </button>
  );
};
export default IconButton;
