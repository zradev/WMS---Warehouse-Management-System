import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { IProduct } from "../utils/interfaces";

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  return (
    <Link
      to={`/products/${product._id}`}
      key={product._id}
      className="w-full bg-white p-4 border border-gray-300 border-b-gray-500 rounded"
    >
      <div className="flex flex-col">
        <div className="capitalize ">
          <h1 className="text-xl font-bold mb-3">{product.name}</h1>
          <h2 className="text-md mb-2 ml-3">Quantity: {product.quantity}</h2>
        </div>
        <div className="flex self-center w-[25vh] h-[25vh] md:w-[15vw] md:h-[15vw]">
          <img
            src={product.images[0]}
            alt="car"
            className="w-auto h-auto object-contain rounded"
          />
        </div>
        <div className="flex justify-around mt-3">
          <div>
            <h1>Buy Price</h1>
            <h1 className="text-xl font-bold">
              {formatCurrency(product.buyingPrice)}
            </h1>
          </div>
          <div>
            <h1>Sell Price</h1>
            <h1 className="text-xl font-bold">
              {formatCurrency(product.sellingPrice)}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
