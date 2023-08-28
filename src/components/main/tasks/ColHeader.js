import React from "react";
import { MoreVert } from "@mui/icons-material";

import IconButton from "../../custom/buttons/IconButton";

const ColHeader = ({
  column,
  showMenu,
  setShowMenu,
  dispatch,
  columnIndex,
}) => {
  // console.log("column", column);
  return (
    <div className="relative inline-block text-left">
      <div
        className={`flex relative max-h-[40px] items-center justify-between text-white text-lg rounded-md p-2 uppercase my-3`}
        style={{ backgroundColor: "grey" }}
      >
        {column.title}
        <IconButton
          Icon={MoreVert}
          onClick={() => {
            // setShowMenu(!showMenu);
            dispatch({
              type: "showMenu",
              payload: { showMenu: !column.showMenu, columnIndex },
            });
          }}
          color="white"
        />
      </div>
      {column.showMenu ? (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1 " role="none">
            <button className="w-full text-right px-4 py-2 hover:bg-gray-200  rounded-md mb-2 hover:opacity-50">
              Edit
            </button>

            <button
              className="w-full text-right px-4 py-2 hover:bg-gray-200 rounded-md mb-2 hover:opacity-50"
              onClick={() => {
                dispatch({
                  type: "deleteColumn",
                  payload: { column: column },
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ColHeader;
