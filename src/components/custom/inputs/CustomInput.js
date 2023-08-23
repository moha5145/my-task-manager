import React from "react";

const CustomInput = ({
  dispatch,
  type,
  category,
  state,
  onChange,
  value = "",
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
      value={value}
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
