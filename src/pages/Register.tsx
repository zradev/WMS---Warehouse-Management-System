import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../components/Signup";
import AuthContext from "../context/AuthProvider";

const Register = () => {
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
      <h1 className="w-full text-center text-2xl">Create your account</h1>
      <Signup />
    </div>
  );
};

export default Register;
