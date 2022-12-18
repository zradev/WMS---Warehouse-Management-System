import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/user/login`,
          values
        );
        //login(response.user);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full justify-center items-center my-10"
    >
      <div className="flex flex-col space-y-5 w-full sm:w-2/3 md:w-1/3 mx-5">
        <label htmlFor="username" className="text-start font-bold">
          Username<span className="text-red-800">*</span>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
          className="rounded border border-gray-600 focus:border-black"
        />
        <label htmlFor="password" className="text-start font-bold">
          Password<span className="text-red-800">*</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          className="rounded border border-gray-600 focus:border-black"
        />
        <Link to="/reset" className="text-end hover:text-blue-600">
          Forgot Password?
        </Link>
        <button
          type="submit"
          className="w-fit self-center p-1 px-6 rounded-lg  border border-black hover:bg-gray-100 font-bold"
        >
          Login
        </button>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signin;
