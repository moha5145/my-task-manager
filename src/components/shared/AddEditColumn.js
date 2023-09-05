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
}) => {
  const [showInput, setShowInput] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex gap-1  h-10 ">
      {showInput ? (
        <input
          type="text"
          autoFocus
          placeholder={placeholder}
          className={`rounded-md p-2 sm:w-80 ${shadow}`}
          onChange={(e) => setColumnName(e.target.value)}
          defaultValue={column?.title || ""}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key === "Enter") {
              onClick();
              setShowInput(false);
            }
          }}
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
          onClick={(e) => {
            e.preventDefault();
            onClick();
            setShowInput(false);
          }}
        />
      ) : (
        <ColoredButton
          Icon={showInput ? Clear : Icon}
          text={showInput ? "" : text}
          fontSize={fontSize}
          backgroundColor={color}
          onClick={() => {
            setShowInput(!showInput);
          }}
        />
      )}
    </div>
  );
};
export default AddColumn;
