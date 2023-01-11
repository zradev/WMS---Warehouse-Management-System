import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import { IProduct, ISupplier } from "../utils/interfaces";
import { axiosErrorHandler } from "../utils/axiosErrorHandler";

const EditProductForm = ({ product }: { product: IProduct }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [buyingPrice, setBuyingPrice] = useState(product.buyingPrice);
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
  const [quantity, setQuantity] = useState(product.quantity);
  const [category, setCategory] = useState(product.category);
  const [supplier, setSupplier] = useState<ISupplier>(product.supplier);
  const [suppliers, setSuppliers] = useState<ISupplier[]>();

  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const categories = ["Food", "Stationery", "Building Supplies"];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/supplier/get-all`)
      .then((res) => {
        setSuppliers(res.data);
      });
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/product/update/${product?._id}`,
        {
          name,
          description,
          buyingPrice,
          sellingPrice,
          quantity,
          category,
          supplier,
        }
      );
      navigate(`/products/${product?._id}`);
    } catch (error) {
      setError(axiosErrorHandler(error));
      window.scrollTo(0, 0);
    }
  };

  const decreaseQuantity = (e: any) => {
    e.preventDefault();
    quantity > 0 && setQuantity((count) => count - 1);
  };

  const increaseQuantity = (e: any) => {
    e.preventDefault();
    setQuantity((count) => count + 1);
  };

  const selectSupplier = (e: any) => {
    const selected = suppliers?.find((_supplier) => {
      return _supplier.name === e.target.value;
    });
    setSupplier(selected!);
    console.log(selected);
  };

  return (
    product.images && (
      <form
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col w-full p-3 lg:px-[20vw] md:px-[100px] my-2"
        autoComplete="off"
      >
        <h2 className="text-2xl text-center border-b mb-6">Edit</h2>
        {error && (
          <div className="text-center text-2xl text-rose-400">{error}</div>
        )}
        <div className="mb-5 mx-auto h-max">
          <Gallery images={product.images} />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="name" className="font-bold text-lg">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="category" className="font-bold text-lg">
            Category:
          </label>
          <select
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={category}
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          >
            {categories.map((_category) => (
              <option key={_category} value={_category}>
                {_category}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="supplier" className="font-bold text-lg">
            Supplier:
          </label>
          <div></div>
          {suppliers && (
            <select
              id="supplier"
              onChange={selectSupplier}
              defaultValue={supplier.name}
              className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
            >
              {suppliers.map((_supplier) => (
                <option key={_supplier.name} value={_supplier.name}>
                  {_supplier.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="price" className="font-bold text-lg">
            Buying Price:
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={buyingPrice}
            min={0}
            onChange={(e) => setBuyingPrice(+e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="price" className="font-bold text-lg">
            Selling Price:
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={sellingPrice}
            min={0}
            onChange={(e) => setSellingPrice(+e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          />
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="description" className="font-bold text-lg">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            cols={30}
            rows={10}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          ></textarea>
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="count" className="font-bold text-lg">
            Quantity:
          </label>
          <div className="flex gap-5 text-2xl justify-center items-center p-1 px-2 w-[45vw] md:w-[20vw] select-none">
            <button
              onClick={decreaseQuantity}
              className="flex justify-center items-center text-white w-5 h-5 bg-stone-800 rounded-full hover:scale-110"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={increaseQuantity}
              className="flex justify-center items-center text-white w-5 h-5 bg-stone-800 rounded-full hover:scale-110"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            type="submit"
            className="bg-stone-800 hover:bg-stone-700 text-xl text-white py-3 md:py-2 px-3 rounded-full"
            value={"Update"}
          />
        </div>
      </form>
    )
  );
};

export default EditProductForm;
