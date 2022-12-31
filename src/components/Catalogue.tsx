import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Product from "./Product";
import SearchBar from "./SearchBar";
import { FaFilter } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import Pagination from "./Pagination";
import { IProduct } from "../../types";
import axios from "axios";
import ProductSkeleton from "./ProductSkeleton";
import NoResults from "./NoResults";

const Catalogue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsData2, setProductsData] = useState<IProduct[]>([]);
  const productsData: IProduct[] = [
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "Foods",
    },
    {
      _id: "123456789",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14-Plus/Blue/Apple-iPhone-14-Plus-Blue-thumbnail.png",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://media.4rgos.it/s/Argos/9520103_R_SET?$Main768$&w=620&h=620",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14-Plus/Blue/Apple-iPhone-14-Plus-Blue-thumbnail.png",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://media.4rgos.it/s/Argos/9520103_R_SET?$Main768$&w=620&h=620",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14-Plus/Blue/Apple-iPhone-14-Plus-Blue-thumbnail.png",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://media.4rgos.it/s/Argos/9520103_R_SET?$Main768$&w=620&h=620",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
    {
      _id: "1",
      name: "prod 1",
      description: "dealfjasjkhduiassaaa",
      images: [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204",
        "",
      ],
      buyingPrice: 20,
      sellingPrice: 20,
      quantity: 20,
      category: "a",
    },
  ];
  const [products, setProducts] = useState<IProduct[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("selectedCategory") || "All"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");

  const productsPerPage = 12;
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/products/get-all`)
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
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
    } else {
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
    }
  }, [productsData, selectedCategory, searchParam]);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full h-[50px] my-5">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden bg-stone-700 text-white font-bold py-3 px-3 rounded-full"
        >
          <FaFilter className="text-white w-4 h-4" />
        </button>
        <SearchBar setSearchParam={setSearchParam} />
        <Link to="/add">
          <button className="bg-stone-700 text-white font-semibold py-3 md:py-2 px-3 rounded-full">
            <BsPlus className="md:hidden" />
            <span className="hidden md:inline"> New Product</span>
          </button>
        </Link>
      </div>
      <div className=" flex w-full">
        <Filter
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
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
