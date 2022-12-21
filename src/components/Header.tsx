import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import UserBubble from "./UserBubble";

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header className="select-none flex shadow-sm p-3 items-center justify-between md:px-[200px] py-4 w-full bg-gray-900 text-white">
      <h1 className="self-center m-auto text-2xl">
        WMS <span className="hidden md:inline"> - WAREHOUSE MANAGEMENT</span>
      </h1>
      {auth && <UserBubble />}
    </header>
  );
};

export default Header;
