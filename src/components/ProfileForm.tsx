import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import AuthContext from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProfileForm = () => {
  const { auth, updateUser } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const notify = () => {
    message.includes("Success")
      ? toast(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : toast("Fail", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  };

  const formik = useFormik({
    initialValues: {
      username: auth!.username,
      phone: auth!.phone,
      email: auth!.email,
    },
    onSubmit: async (values) => {
      updateUser(auth!._id, values).then((res) => {
        setMessage(() => res);
      });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-2/3 lg:w-1/2 mx-auto"
      >
        <h2 className="text-2xl text-center border-b my-6">
          Profile Information
        </h2>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="username" className="font-bold text-lg">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={formik.handleChange}
            value={formik.values.username}
            className="rounded-lg border border-gray-400 focus:outline-sky-800 p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="phone" className="font-bold text-lg">
            Phone Number:
          </label>
          <input
            type="tel"
            pattern="[0-9]*"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="rounded-lg border border-gray-400 focus:outline-sky-800  p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="email" className="font-bold text-lg">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
            className="rounded-lg border border-gray-400 focus:outline-sky-800  p-1 px-2 w-[45vw] md:w-[20vw]"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            onClick={notify}
            className="bg-stone-700 hover:bg-stone-600 text-white py-3 md:py-2 px-3 rounded-full my-3"
          >
            Update
          </button>
          <ToastContainer />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
