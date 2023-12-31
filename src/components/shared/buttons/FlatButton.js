import { Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";

const FlatButton = ({
  text = null,
  onClick,
  color,
  Icon = null,
  p = 2,
  disabled = false,
  link = "/",
  tooltipContent = null
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
    <Tooltip content = {tooltipContent} open={hover && tooltipContent}>
      <button
        type="button"
        disabled={disabled}
        className={text ? `flex flex-1 gap-1 justify-start items-center p-${p} sm:p-1 text-xs sm:text-sm md:text-md border hover:text-white rounded-lg bg-[${color}] cursor-pointer` :
        `p-${p} sm:p-1 text-xs sm:text-sm md:text-md border hover:text-white rounded-lg bg-[${color}]  cursor-pointer`}
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        to={link}
      >
        {Icon && <Icon />}
        {text && <span className=" hidden sm:block uppercase">{text}</span>}
      </button>          
    </Tooltip>
  );
};
export default FlatButton;
