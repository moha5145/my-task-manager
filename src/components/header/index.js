import React from "react";
import { Lock } from "@mui/icons-material";

import FlatButton from "../shared/buttons/FlatButton";

const Header = () => {
  return (
    <div className="flex w-screen justify-between items-center py-1 sm:py-6 px-2 border-b-2">
      <p>React ToDo</p>
      <div className="flex gap-1">
        <FlatButton
          Icon={Lock}
          text="Déconexion"
          p={1}
          onClick={() => console.log("Backoffice")}
          backgroundColor="red"
          color="red"
        />
      </div>
    </div>
  );
};
export default Header;
