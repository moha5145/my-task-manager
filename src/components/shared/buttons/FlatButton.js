import React, { useState } from "react";

const FlatButton = ({
  state,
  category,
  dispatch,
  text = null,
  onClick,
  color,
  Icon = null,
  p = 2,
  disabled = false,
  link = "/",
}) => {
  const [hover, setHover] = useState(false);

  const buttonStyle = {
    background: hover ? color : "none",
    borderColor: color,
    color: hover ? "white" : color,
  };

  const handleMouseEnter = () => setHover(true);

  const handleMouseLeave = () => setHover(false);

  return (
    <button
      type="button"
      disabled={disabled}
      className={`flex flex-1 gap-1 justify-center items-center p-${p} sm:p-2 text-xs sm:text-sm md:text-md border hover:text-white rounded-lg bg-[${color}] cursor-pointer`}
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      to={link}
    >
      {Icon && <Icon />}
      <span className=" hidden sm:block ">{text}</span>
    </button>
  );
};
export default FlatButton;
