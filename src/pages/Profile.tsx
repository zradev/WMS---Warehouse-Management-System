import axios from "axios";
import React, { useState, useContext } from "react";
import ProfileForm from "../components/ProfileForm";
import AuthContext from "../context/AuthProvider";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, auth } = useContext(AuthContext);

  const handleDelete = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/user/delete/${auth?._id}`
    );
    setIsOpen(false);
    logout();
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <ProfileForm />
      {isOpen && (
        <div
          className={`${
            isOpen
              ? "fixed top-0 left-0 z-[9999] w-[100%] h-[100vh] overflow-hidden bg-black bg-opacity-50 "
              : "hidden"
          }`}
          onClick={() => setIsOpen(() => false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex w-auto h-auto"
          >
            <div className="flex flex-col gap-5 bg-white px-8 pt-10 text-xl rounded">
              <h1>Please confirm</h1>
              <p>Are you sure you want to delete this account?</p>
              <div className="flex gap-8 justify-center">
                <button
                  onClick={() => setIsOpen(() => false)}
                  className="bg-stone-100 hover:bg-stone-200 text-black font-bold text-start w-fit my-10 border border-gray-400 p-1 px-4 rounded-full "
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="text-white bg-stone-800 hover:bg-stone-700 w-fit my-10 p-1 px-4 rounded-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col text-center items-center w-full p-3 my-auto lg:px-[250px] md:px-[200px]">
        <h2>
          This is permanent. <br />
          When you delete your account, you won't be able to retrieve it.
        </h2>
        <button
          className="bg-stone-800 hover:bg-stone-700 text-white py-3 md:py-2 px-3 rounded-full my-3"
          onClick={() => setIsOpen(true)}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
