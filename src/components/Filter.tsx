import React, { useEffect, useRef } from "react";

const Filter = ({
  isOpen,
  setIsOpen,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}: any) => {
  const filter = useRef<any>(null);
  const categories = ["Food", "Stationery", "Building Supplies"];

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (filter.current && !filter.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filter, setIsOpen]);

  const handleClick = (event: any) => {
    sessionStorage.setItem("selectedCategory", event.target.value);
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onChange={handleClick}
      ref={filter}
      className={`fixed top-0 z-50 w-fit h-full pt-[20vh] px-9 md:sticky md:top-[90px] md:h-fit md:p-5 md:mt-2 bg-white md:animate:none ${
        isOpen
          ? "left-[-100%] w-[60vw] slide-in-left"
          : " left-0 slide-out-left "
      }`}
    >
      <h1 className="text-lg">Categories</h1>
      <div className="flex items-center ml-5 w-max">
        <input
          id="default-radio-all"
          defaultChecked={selectedCategory === "All"}
          type="radio"
          value="All"
          name="default-radio"
          className="outline-none border-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 accent-stone-700"
        />
        <label
          htmlFor="default-radio-all"
          className="ml-2 text-md font-medium text-gray-900"
        >
          All
        </label>
      </div>
      {categories.map((category, index) => (
        <div key={index} className="flex items-center ml-5 w-max">
          <input
            id={`default-radio-${index}`}
            defaultChecked={selectedCategory === category}
            type="radio"
            value={category}
            name="default-radio"
            className="outline-none border-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 accent-stone-700"
          />
          <label
            htmlFor={`default-radio-${index}`}
            className="ml-2 text-md font-medium text-gray-900"
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
