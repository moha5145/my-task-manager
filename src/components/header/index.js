import React from "react";
import LockIcon from "@mui/icons-material/Lock";

import ColoredButton from "../custom/buttons/ColoredButton";
import FlatButton from "../custom/buttons/FlatButton";

const Header = () => {
  return (
    <div className="flex w-screen justify-between py-3 sm:py-8 px-5 border-b-2">
      <p>React ToDo</p>
      <div className="flex gap-1">
        <ColoredButton
          text="Backoffice"
          onClick={() => console.log("Backoffice")}
          backgroundColor="#22c55e"
          color=""
        />
        <FlatButton
          Icon={LockIcon}
          text="Déconexion"
          onClick={() => console.log("Backoffice")}
          backgroundColor="red"
          color="red"
        />
      </div>
    </div>
  );
};
export default Header;
