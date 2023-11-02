import { Tooltip } from "@radix-ui/themes";
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
  p = 1,
  tooltipContent = null
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
    <Tooltip content = {tooltipContent} open={isHovered && tooltipContent} >
      <button
        className={`flex gap-1 flex-1 justify-start items-center text-white rounded-lg p-1 sm:p-${p} text-xs sm:text-sm md:text-md border cursor-pointer`}
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
    </Tooltip>
  );
};
export default ColoredButton;
