import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useScrollLock } from "../hooks/useScrollLock";
import { IUser } from "../utils/interfaces";

const UserBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>();
  const { logout, getUserData } = useContext(AuthContext);
  const { lockScroll, unlockScroll } = useScrollLock();
  const [preventAnimationOnLoad, setPreventAnimationOnLoad] = useState(true);
  const bubble = useRef<any>(null);

  useEffect(() => {
    const userData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [getUserData]);

  useEffect(() => {
    if (window.innerWidth < 768) isOpen ? lockScroll() : unlockScroll();
  }, [isOpen, lockScroll, unlockScroll]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (bubble.current && !bubble.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bubble]);

  return (
    <div
      ref={bubble}
      className="text-black absolute right-5 md:right-[100px] lg:right-[200px]"
    >
      <button
        onClick={() => {
          setIsOpen((prev) => {
            setPreventAnimationOnLoad(false);
            return !prev;
          });
        }}
        className={`flex items-center justify-center relative bg-[#CDCBCA] z-40 w-[45px] h-[45px] border m-auto text-2xl pt-1.5 rounded-full border border-gray-700`}
      >
        <p className="font-semibold">{user?.username[0].toUpperCase()}</p>
      </button>
      <div
        className={`fixed md:absolute top-0 w-full h-full pt-[30vh] my-auto px-9 md:w-max md:static md:h-auto md:p-5 md:mt-2 bg-white ${
          isOpen
            ? " right-[-100%] md:left-[-150%] md:top-[100%] slide-in-right md:animate:none md:animate-none md:rounded-lg md:border md:ml-auto"
            : preventAnimationOnLoad
            ? " right-[-100%] md:hidden"
            : " right-0  slide-out-right md:hidden"
        }`}
      >
        {isOpen && (
          <ul className="flex flex-col items-center space-y-10 md:space-y-4 text-3xl md:text-xl md:mt-0">
            <li
              className="hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/products">Products</Link>
            </li>
            <li
              className="hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/profile">Edit Profile</Link>
            </li>
            <li
              className="hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <button onClick={logout}>Sign out</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserBubble;
