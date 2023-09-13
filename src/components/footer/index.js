import React from "react";

const Footer = ({ category = null }) => {
  const bgColor = category?.color?.primary || "#62C188";
  return (
    <div
      className={`fixed bottom-0 w-full text-white text-2xl px-5 p-3`}
      style={{ backgroundColor: bgColor }}
    >
      {/* <p>Footer</p> */}
    </div>
  );
};
export default Footer;
