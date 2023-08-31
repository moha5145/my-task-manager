import React, { useState } from "react";

const ColoredButton = ({
  text,
  onClick,
  backgroundColor,
  Icon,
  disabled = false,
  color = "",
  to = "",
  as = "button",
  fontSize = "medium",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    background: isHovered ? "none" : backgroundColor,
    color: isHovered ? backgroundColor : color,
    borderColor: isHovered ? backgroundColor : "none",
  };
  const handleClick = (event) => {
    event.stopPropagation();
    onClick(event);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className={`flex gap-1 flex-1 justify-center items-center text-white rounded-lg p-1 sm:p-2 text-xs sm:text-sm md:text-md border cursor-pointer`}
      disabled={disabled}
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      as={as}
      to={to}
    >
      {Icon && <Icon fontSize={fontSize} />}
      {text && <span className="hidden sm:block ">{text}</span>}
    </button>
  );
};
export default ColoredButton;
