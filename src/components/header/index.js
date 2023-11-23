import React from "react";
import { Lock, Person } from "@mui/icons-material";

import FlatButton from "../shared/buttons/FlatButton";
import LinkButton from "../shared/buttons/LinkButton";
import { useLocation } from "react-router";

const Header = ({setUser, state, setInviteMode,inviteMode}) => {
  const location = useLocation()

  return (
    <div className="flex w-screen justify-between items-center py-1 sm:py-6 px-2 border-b-2">
      <p className="text-xl font-bold text-gray-500">My task manager</p>
      <div className="flex gap-2">
        {state.user.userToken ? (
          <FlatButton
            Icon={Lock}
            text="Déconexion"
            p={1}
            onClick={() => setUser(null, null, null, null)}
            backgroundColor="red"
            color="red"
          />
        ) : (
          <div>
            {location.pathname === "/login" ? (
              <LinkButton 
              Icon={Person}
              text="S'inscrire"
              p={1}
              to="/signup"
              backgroundColor="#66c08a"
              color="white"
            />
              
            ) : 
              <LinkButton 
                Icon={Person}
                text="S'identifier"
                p={1}
                to="/login"
                backgroundColor="#66c08a"
                color="white"
              />
            }
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
