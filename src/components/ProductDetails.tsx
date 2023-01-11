import React, { useState } from "react";
import axios from "axios";
import { IProduct } from "../utils/interfaces";
import { useNavigate, Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { axiosErrorHandler } from "../utils/axiosErrorHandler";
import { TbInfoSquare, TbTruckDelivery } from "react-icons/tb";
import Gallery from "./Gallery";

interface IProps {
  product: IProduct;
}

const ProductDetails = ({ product }: IProps) => {
  const [error, setError] = useState<String>();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/product/delete/${product?._id}`
      );
      navigate("/products");
    } catch (error) {
      setError(axiosErrorHandler(error));
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      {modal && (
        <div
          className={`${
            modal
              ? "fixed top-0 left-0 z-[9999] w-[100%] h-[100vh] overflow-hidden bg-black bg-opacity-50 "
              : "hidden"
          }`}
          onClick={() => setModal(() => false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex w-auto h-auto"
          >
            <div className="flex flex-col gap-5 bg-white px-8 pt-10 text-xl rounded">
              <h1>Please confirm</h1>
              <p>Are you sure you want to delete this product?</p>
              <div className="flex space-x-8 justify-center">
                <button
                  onClick={() => setModal(() => false)}
                  className="bg-stone-100 hover:bg-stone-200 text-black font-bold text-start w-fit my-10 border border-gray-400 p-1 px-4 rounded-full "
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-stone-800 hover:bg-stone-700 text-white text-start w-fit my-10 border border-gray-400 p-1 px-4 rounded-full "
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {product ? (
        <div className="flex flex-col gap-5 md:pb-[80px] mt-10">
          {error && (
            <div className="text-2xl text-center text-rose-400">{error}</div>
          )}
          <div className="flex space-x-3 mx-10">
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <p className="text-gray-600"> &gt;</p>
            <Link to="/products" className="hover:underline">
              {sessionStorage.getItem("selectedCategory") || "All"}
            </Link>
            <p className="text-gray-600"> &gt;</p>
            <p className="text-gray-600">{product.name}</p>
          </div>
          <div className="flex flex-col md:flex-row">
            <Gallery images={product?.images} />
            <div className="mx-auto w-full md:w-1/3 p-8">
              <h1 className="text-2xl">{product?.name}</h1>
              <div className="flex items-center pt-2">
                <div className="space-y-3 my-3 text-lg">
                  <p>Quantity: {product.quantity}</p>
                  <p>Buying price: {formatCurrency(product.buyingPrice)}</p>
                  <p>Selling price: {formatCurrency(product.sellingPrice)}</p>
                </div>
                <TbInfoSquare className="ml-auto text-5xl" />
              </div>
              <div className="flex items-center border-t pt-2">
                <div className="space-y-3 my-3 text-lg">
                  <h1 className="text-xl">Supplier</h1>
                  <p>Name: {product.supplier.name}</p>
                  <p>Phone: {product.supplier.phone}</p>
                  <p>Email: {product.supplier.email}</p>
                </div>
                <TbTruckDelivery className="ml-auto text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 text-lg p-8">
            <p className="md:mx-10">{product?.description}</p>
          </div>
          <div className="self-center space-x-10">
            <Link to={`/products/edit/${product?._id}`}>
              <button className="bg-stone-800 hover:bg-stone-700 text-white py-3 md:py-2 px-6 rounded-full my-3">
                EDIT
              </button>
            </Link>
            <button
              className="bg-stone-800 hover:bg-stone-700 text-white py-3 md:py-2 px-6 rounded-full my-3"
              onClick={() => setModal(true)}
            >
              DELETE
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh]"></div>
      )}
    </div>
  );
};

export default ProductDetails;
