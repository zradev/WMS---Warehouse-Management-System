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
    <div className="p-5 mt-5 text-center">
      <h1 className="w-full text-2xl">Log in to your account</h1>
      <Signin />
      <p>If you want to skip registration use:</p>
      <p>Username: test</p>
      <p>Password: @Test123</p>
      <p>NOTE: This is for testing purposes</p>
    </div>
  );
};

export default Login;
