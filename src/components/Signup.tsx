import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosErrorHandler } from "../utils/axiosErrorHandler";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/user/register`,
          values
        );
        navigate("/");
      } catch (error) {
        console.log(axiosErrorHandler(error));
        setError(axiosErrorHandler(error));
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full justify-center items-center my-10"
    >
      <div className="flex flex-col space-y-5 w-full sm:w-2/3 md:w-1/3 mx-5">
        <p className="text-center text-red-600">{error}</p>
        <label htmlFor="username" className="text-start text-lg">
          Username<span className="text-red-800">*</span>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
          className="rounded border border-gray-600 focus:border-black px-1"
        />
        <label htmlFor="email" className="text-start text-lg">
          Email<span className="text-red-800">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={formik.handleChange}
          value={formik.values.email}
          className="rounded border border-gray-600 focus:border-black px-1"
        />
        <label htmlFor="phone" className="text-start text-lg">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          pattern="^[0-9\s-]{3,15}$"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="rounded border border-gray-600 focus:border-black px-1"
        />
        <label htmlFor="password" className="text-start  text-lg">
          Password<span className="text-red-800">*</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          className="rounded border border-gray-600 focus:border-black px-1"
        />
        <div className="text-gray-600 mt-3">
          <h2>Password must have:</h2>
          <p> {"\u2022"} At least 1 upper-case and 1 lower-case letter</p>
          <p> {"\u2022"} At least 1 number</p>
          <p> {"\u2022"} At least 1 special symbol</p>
          <p> {"\u2022"} Min 8 and max 50 characters</p>
        </div>
        <div className="flex space-x-8">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            required
            className="w-10 md:w-8 lg:w-6 accent-stone-700 rounded"
          />
          <label htmlFor="checkbox" className="text-sm">
            I agree to the Warehouse Management System Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </label>
        </div>
        <button
          type="submit"
          className="bg-stone-700 text-xl text-white py-3 md:py-2 px-3 rounded-full"
        >
          Register
        </button>
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:text-blue-600">
            Log In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
