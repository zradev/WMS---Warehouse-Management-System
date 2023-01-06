import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from "axios";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { axiosErrorHandler } from "../utils/axiosErrorHandler";
import { ISupplier } from "../utils/interfaces";

const NewProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([] as string[]);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Food");
  const [supplier, setSupplier] = useState<ISupplier>();
  const [suppliers, setSuppliers] = useState<ISupplier[]>();

  const [error, setError] = useState("");
  const [progress, setProgress] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/supplier/get-all`)
      .then((res) => {
        setSuppliers(res.data);
        setSupplier(res.data[0]);
      });
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await uploadImages().then(async (res) => {
      if (!res) {
        throw new Error("No images selected");
      }
      try {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/product/add`, {
          name,
          description,
          images: res as string[],
          buyingPrice,
          sellingPrice,
          quantity,
          category,
          supplier,
        });
        navigate("/products");
      } catch (error: any) {
        res.map((img) => deleteObject(ref(storage, img)));
        if (error.response.status === 500) {
          console.log(error);

          setError("Error: All fields are required.");
        } else {
          setError(axiosErrorHandler(error));
        }
        window.scrollTo(0, 0);
      }
    });
  };

  const decreaseCount = (e: any) => {
    e.preventDefault();
    quantity > 0 && setQuantity((count) => count - 1);
  };

  const increaseCount = (e: any) => {
    e.preventDefault();
    setQuantity((count) => count + 1);
  };

  const uploadImages = async () => {
    if (images.length === 0) {
      setError("Error: At least 1 image is required!");
      return window.scrollTo(0, 0);
    }
    try {
      const result = await Promise.all(
        images.map((image: any) => {
          return new Promise((resolve, reject) => {
            const imageName = image.name + v4();
            const sotrageRef = ref(storage, `images/${imageName}`);
            const uploadTask = uploadBytesResumable(sotrageRef, image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              (err) => {
                console.log(err);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  resolve(url);
                });
              }
            );
          });
        })
      );
      return result as string[];
    } catch (error: any) {
      setError(error);
      window.scrollTo(0, 0);
    }
  };

  const selectSupplier = (e: any) => {
    const selected = suppliers?.find((supp) => {
      return supp.name === e.target.value;
    });
    setSupplier(selected);
    console.log(selected);
  };

  return (
    <>
      <form
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col  w-full p-3 lg:px-[250px] md:px-[200px] my-2"
        autoComplete="off"
      >
        <h2 className="text-2xl text-center border-b mb-6">Add New Product</h2>
        {error && (
          <div className="text-center text-2xl text-rose-400">{error}</div>
        )}
        <ImageUploader images={images} setImages={setImages} />
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
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          >
            <option value="Food">Food</option>
            <option value="Stationery">Stationery</option>
            <option value="Building Supplies">Building Supplies</option>
          </select>
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="supplier" className="font-bold text-lg">
            Supplier:
          </label>
          <div></div>
          <select
            id="supplier"
            onChange={selectSupplier}
            className="rounded-lg border border-gray-400 focus:outline-stone-800 p-1 px-2 w-[55vw] md:w-[20vw]"
          >
            {suppliers?.map((supp) => (
              <option key={supp._id} value={supp.name}>
                {supp.name}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex justify-between items-center m-3">
          <label htmlFor="price" className="font-bold text-lg">
            Buying Price:
          </label>
          <input
            type="number"
            id="price"
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
              onClick={decreaseCount}
              className="flex justify-center items-center text-white w-5 h-5 bg-stone-700 rounded-full hover:scale-110"
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={increaseCount}
              className="flex justify-center items-center text-white w-5 h-5 bg-stone-700 rounded-full hover:scale-110"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          {progress > 0 && <p>Creating: {progress}%</p>}
          <input
            type="submit"
            className="bg-stone-700 hover:bg-stone-600 text-xl text-white py-3 md:py-2 px-3 rounded-full"
            value={"Create"}
          />
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
