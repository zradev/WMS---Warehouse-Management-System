export interface IUser {
  _id: string;
  username: string;
  email: string;
  phone: string;
}

export interface ISupplier {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  images: string[];
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  category: string;
  supplier: ISupplier;
}
