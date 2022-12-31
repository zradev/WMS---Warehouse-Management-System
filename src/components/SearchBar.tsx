import React, { useState } from "react";

interface IProps {
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ setSearchParam }: IProps) => {
  const [param, setParam] = useState("");
  return (
    <div className="flex items-center mx-2 md:mx-5">
      <form onSubmit={(e) => e.preventDefault()} className="flex space-x-1">
        <input
          type="text"
          onChange={(e) => {
            setParam(e.target.value);
            setTimeout(() => setSearchParam(e.target.value), 1500);
          }}
          className="block w-full px-4 py-2 text-stone-700 bg-white border border-stone-300 rounded-full focus:border-stone-400 focus:ring-stone-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
        <button
          className="px-4 text-white bg-stone-700 rounded-full "
          onClick={() => setSearchParam(param)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
