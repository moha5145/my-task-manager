import React from "react";

const CustomInput = ({
  onChange,
  defaultValue = "",
  placeholder,
  onFocus = null,
  onBlur = null,
  style,
  className,
  autoFocus = false,
  onKeyDown = null,
}) => {
  return (
    <input
      onChange={onChange}
      onKeyDown={onKeyDown}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      onFocus={onFocus}
      onBlur={onBlur}
      type="text"
      placeholder={placeholder}
      className={className}
      style={style}
    />
  );
};
export default CustomInput;
