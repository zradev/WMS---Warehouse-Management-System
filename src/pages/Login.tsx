import React from "react";
import Signin from "../components/Signin";

const login = () => {
  return (
    <div className="p-5 mt-5">
      <h1 className="w-full text-center text-2xl">Log in to your account</h1>
      <Signin />
    </div>
  );
};

export default login;
