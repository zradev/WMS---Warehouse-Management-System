import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../utils/interfaces";
import ProductDetails from "../components/ProductDetails";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/product/get/${id}`
        );
        setProduct(() => data);
      } catch (error) {
        navigate("/redirect");
      }
    };
    getProduct();
  }, [id, navigate]);
  return (
    <div>
      <ProductDetails product={product!} />
    </div>
  );
};

export default ProductPage;
