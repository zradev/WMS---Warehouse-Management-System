import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../components/Signin";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);

    if (auth) {
      navigate("/products");
    }
  }, [auth, navigate]);

  return (
    <div className="p-5 mt-5">
      <h1 className="w-full text-center text-2xl">Log in to your account</h1>
      <Signin />
    </div>
  );
};

export default Login;
