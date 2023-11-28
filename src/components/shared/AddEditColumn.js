import React, { useState } from "react";
import { Save, Clear } from "@mui/icons-material";

import ColoredButton from "./buttons/ColoredButton";

const AddColumn = ({
  Icon,
  fontSize = "large",
  text = "",
  shadow = "none",
  color,
  onClick,
  setColumnName,
  columnName,
  column = null,
  placeholder,
  onKeyUp,
  showInput,
  setShowInput,
  p,
  tooltipContent,
  h=24
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={`flex w-10/12 gap-1 h-${h} sm:h-${h}`}>
      {showInput ? (
        <input
          type="text"
          autoFocus
          placeholder={placeholder}
          className={`rounded-md p-2 sm:w-80 ${shadow}`}
          onChange={(e) => setColumnName(e.target.value)}
          defaultValue={column?.title || columnName}
          onKeyUp={onKeyUp}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          style={focus ? { outlineColor: color } : { border: "none" }}
        />
      ) : null}

      {showInput && columnName.length > 2 ? (
        <ColoredButton
          Icon={Save}
          text={showInput ? "" : text}
          backgroundColor={color}
          fontSize={fontSize}
          p={6}
          tooltipContent={tooltipContent}
          onClick={(e) => {
            e.preventDefault();
            onClick();
            setColumnName("");
            setShowInput(false);
          }}
        />
      ) : (
        <ColoredButton
          Icon={showInput ? Clear : Icon}
          text={showInput ? "" : text}
          fontSize={fontSize}
          backgroundColor={color}
          p={p}
          h={h}
          tooltipContent={tooltipContent}
          onClick={() => {
            setShowInput(!showInput);
          }}
        />
      )}
    </div>
  );
};
export default AddColumn;
