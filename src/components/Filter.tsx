import React, { useState, useEffect, useRef } from "react";

interface IProps {
  isOpen: boolean;
  preventOnStart: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  suppliers: string[];
  selectedSupplier: string;
  setSelectedSupplier: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({
  isOpen,
  preventOnStart,
  setIsOpen,
  selectedCategory,
  setSelectedCategory,
  suppliers,
  selectedSupplier,
  setSelectedSupplier,
  setCurrentPage,
}: IProps) => {
  const filter = useRef<any>(null);
  const supplierFilter = useRef<any>(null);
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

  const handleCategoryClick = (event: any) => {
    sessionStorage.setItem("selectedCategory", event.target.value);
    setSelectedCategory(event.target.value);
    supplierFilter.current.click();
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const handleSupplierClick = (event: any) => {
    sessionStorage.setItem("selectedSupplier", event.target.value);
    setSelectedSupplier(event.target.value);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  return (
    <div
      ref={filter}
      className={`fixed top-0 z-50 w-fit h-full pt-[20vh] px-9 md:sticky md:top-[90px] md:h-fit md:p-5 md:mt-2 bg-white md:animate:none ${
        isOpen
          ? "left-[-100%] w-[60vw] slide-in-left"
          : preventOnStart
          ? "left-[-100%]"
          : " left-0 slide-out-left "
      }`}
    >
      <div onChange={handleCategoryClick}>
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
      <div onChange={handleSupplierClick}>
        <h1 className="text-lg mt-5">Suppliers</h1>
        <div className="flex items-center ml-5 w-max">
          <input
            id="second-radio-all"
            ref={supplierFilter}
            defaultChecked={selectedSupplier === "All"}
            type="radio"
            value="All"
            name="second-radio"
            className="outline-none border-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 accent-stone-700"
          />
          <label
            htmlFor="second-radio-all"
            className="ml-2 text-md font-medium text-gray-900"
          >
            All
          </label>
        </div>
        {suppliers.map((supplier, index) => (
          <div key={index} className="flex items-center ml-5 w-max">
            <input
              id={`second-radio-${index}`}
              defaultChecked={selectedSupplier === supplier}
              type="radio"
              value={supplier}
              name="second-radio"
              className="outline-none border-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 accent-stone-700"
            />
            <label
              htmlFor={`second-radio-${index}`}
              className="ml-2 text-md font-medium text-gray-900"
            >
              {supplier}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
