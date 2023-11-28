import { Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";

const ColoredButton = ({
  displayText = true,
  text,
  onClick,
  backgroundColor,
  Icon,
  disabled = false,
  color = "",
  to ="/",
  as = "button",
  fontSize = "medium",
  p = 1,
  tooltipContent = null,
  h=10
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
        className={`flex gap-1 flex-1 w-full h-${h} uppercase ${isHovered ? "border" : "border-none"} justify-start  hover:border-spacing-2 items-center text-white rounded-lg p-1 sm:px-${p} text-xs sm:text-sm md:text-md border cursor-pointer`}
        disabled={disabled}
        style={buttonStyle}
        as={as}
        to={to}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Icon && <Icon fontSize={fontSize} />}
        {text && displayText && <span className="text-sm md:text-md pl-1">{text}</span>}
      </button>
    </Tooltip>
  );
};
export default ColoredButton;
