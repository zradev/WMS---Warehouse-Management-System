import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditProductForm from "../components/EditProductForm";
import { IProduct } from "../utils/interfaces";

const EditProduct = () => {
  const [product, setProduct] = useState<IProduct>();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get<IProduct>(`${process.env.REACT_APP_SERVER_URL}/product/get/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);
  return <div>{product && <EditProductForm product={product} />}</div>;
};

export default EditProduct;
