import { Types } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: string[];
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  category: string;
}
