import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Product from "./Product";
import SearchBar from "./SearchBar";
import { FaFilter } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import Pagination from "./Pagination";
import { IProduct } from "../utils/interfaces";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";
import NoResults from "./NoResults";

const Catalogue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("selectedCategory") || "All"
  );
  const [selectedSupplier, setSelectedSupplier] = useState(
    sessionStorage.getItem("selectedSupplier") || "All"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [preventOnStart, setPreventOnStart] = useState(true);

  const productsPerPage = 12;
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const suppliers = useMemo(() => {
    return [
      ...new Set<string>(
        productsData
          .filter((product) => {
            if (selectedCategory !== "All") {
              return (
                product.category.toLocaleLowerCase() ===
                selectedCategory.toLocaleLowerCase()
              );
            }
            return product;
          })
          .map((product) => product.supplier.name)
      ),
    ];
  }, [productsData, selectedCategory]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/product/get-all`)
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All" && selectedSupplier === "All") {
      setProducts(() =>
        productsData.filter(
          (product) =>
            product._id
              .toLocaleLowerCase()
              .includes(searchParam.toLocaleLowerCase()) ||
            product.name
              .toLocaleLowerCase()
              .includes(searchParam.toLocaleLowerCase())
        )
      );
    } else if (selectedCategory !== "All" && selectedSupplier === "All") {
      setProducts(() =>
        productsData
          .filter(
            (product) =>
              product.category.toLocaleLowerCase() ===
              selectedCategory.toLocaleLowerCase()
          )
          .filter(
            (product) =>
              product._id
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase()) ||
              product.name
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase())
          )
      );
    } else if (selectedCategory === "All" && selectedSupplier !== "All") {
      setProducts(() =>
        productsData
          .filter(
            (product) =>
              product.supplier.name.toLocaleLowerCase() ===
              selectedSupplier.toLocaleLowerCase()
          )
          .filter(
            (product) =>
              product._id
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase()) ||
              product.name
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase())
          )
      );
    } else if (selectedCategory !== "All" && selectedSupplier !== "All") {
      setProducts(() =>
        productsData
          .filter(
            (product) =>
              product.category.toLocaleLowerCase() ===
              selectedCategory.toLocaleLowerCase()
          )
          .filter(
            (product) =>
              product.supplier.name.toLocaleLowerCase() ===
              selectedSupplier.toLocaleLowerCase()
          )
          .filter(
            (product) =>
              product._id
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase()) ||
              product.name
                .toLocaleLowerCase()
                .includes(searchParam.toLocaleLowerCase())
          )
      );
    }
  }, [productsData, selectedCategory, searchParam, selectedSupplier]);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full h-[50px] my-5">
        <button
          onClick={() => {
            setPreventOnStart(false);
            setIsOpen(true);
          }}
          className="md:hidden bg-stone-800 text-white font-bold py-3 px-3 rounded-full"
        >
          <FaFilter className="text-white w-4 h-4" />
        </button>
        <SearchBar setSearchParam={setSearchParam} />
        <Link to="/new-product">
          <button className="bg-stone-800 hover:bg-stone-700 text-white py-3 md:py-2 px-3 rounded-full">
            <BsPlus className="md:hidden" />
            <span className="hidden md:inline"> New Product</span>
          </button>
        </Link>
      </div>
      <div className=" flex w-full">
        <Filter
          isOpen={isOpen}
          preventOnStart={preventOnStart}
          setIsOpen={setIsOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          suppliers={suppliers}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
          setCurrentPage={setCurrentPage}
        />
        {isLoading ? (
          <div className="w-full grid gap-2 mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {Array(8)
              .fill(true)
              .map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
          </div>
        ) : products.length > 0 ? (
          <div className="w-full grid gap-2 mx-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {currentProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        ) : (
          <NoResults />
        )}
      </div>
      <Pagination
        totalPosts={products.length}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Catalogue;
