import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import UserBubble from "./UserBubble";

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header className="select-none flex shadow-sm p-3 items-center justify-between md:px-[200px] py-6 w-full bg-stone-900 text-white">
      <Link
        to="/products"
        className="self-center m-auto text-2xl font-bold hover:text-gray-300"
      >
        <h1>
          WMS <span className="hidden md:inline"> - WAREHOUSE MANAGEMENT</span>
        </h1>
      </Link>
      {auth && <UserBubble />}
    </header>
  );
};

export default Header;
