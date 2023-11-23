import { Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LinkButton = ({
  text,
  backgroundColor,
  Icon,
  color = "",
  to ="/",
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Tooltip content = {tooltipContent} open={isHovered && tooltipContent} >
      <Link
        className={`flex gap-1 flex-1 justify-start items-center text-white rounded-lg p-1 sm:p-${p} text-xs sm:text-sm md:text-md border cursor-pointer`}
        style={buttonStyle}
        to={to}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {Icon && <Icon fontSize={fontSize} />}
        {text && <span className="hidden sm:block ">{text}</span>}
      </Link>
    </Tooltip>
  );
};
export default LinkButton;