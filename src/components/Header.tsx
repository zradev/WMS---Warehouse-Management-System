import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import UserBubble from "./UserBubble";
import logo from "../assets/Logo.png";

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header className="relative select-none flex shadow-sm p-3 items-center justify-between md:px-[200px] py-4 w-full bg-stone-900 text-white z-50">
      <Link
        to="/products"
        className="flex items-center justify-center self-center m-auto text-4xl md:text-2xl font-bold md:hover:text-gray-300"
      >
        <img src={logo} alt="logo" className="w-[160px] " />
      </Link>
      {auth && <UserBubble />}
    </header>
  );
};

export default Header;
