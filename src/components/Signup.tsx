import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/user/register`,
          values
        );
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
        <label htmlFor="email" className="text-start font-bold">
          Email<span className="text-red-800">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={formik.handleChange}
          value={formik.values.email}
          className="rounded border border-gray-600 focus:border-black"
        />
        <label htmlFor="phone" className="text-start font-bold">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          pattern="^[0-9\s-]{3,15}$"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="rounded border border-gray-600 focus:border-black"
        />
        <div className="flex space-x-8">
          <input type="checkbox" name="checkbox" id="checkbox" required />
          <label htmlFor="checkbox" className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            repudiandae similique quo ea consequuntur molestias ab.
          </label>
        </div>
        <button
          type="submit"
          className="w-fit self-center p-1 px-6 rounded-lg  border border-black hover:bg-gray-100 font-bold"
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
