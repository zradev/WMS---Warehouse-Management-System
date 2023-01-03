import { ReactNode, createContext, useState } from "react";
import { IUser } from "../utils/interfaces";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosErrorHandler } from "../utils/axiosErrorHandler";

export interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  auth: IUser | null;
  setAuth: React.Dispatch<React.SetStateAction<IUser | null>>;
  getUserData: () => Promise<IUser | null>;
  updateUser: (id: string, values: any) => Promise<any>;
  login: (jwt: any) => void;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [auth, setAuth] = useState<IUser | null>(
    localStorage.getItem("jwt")
      ? jwt_decode(localStorage.getItem("jwt")!)
      : null
  );
  const navigate = useNavigate();

  const getUserData = async () => {
    if (auth) {
      try {
        const { data } = await axios.get<IUser>(
          `${process.env.REACT_APP_SERVER_URL}/user/get/${auth?._id}`
        );
        return data as IUser;
      } catch (error) {
        console.log(error);
        logout();
      }
    }
    return null;
  };

  const updateUser = async (id: string, values: any) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/user/update/${id}`,
        {
          username: values.username,
          phone: values.phone,
          email: values.email,
        }
      );
      const jwt = response?.data?.token;
      console.log(response);

      localStorage.setItem("jwt", jwt);
      setAuth(jwt_decode(jwt));
      return "Updated Successfully!";
    } catch (error) {
      return axiosErrorHandler(error);
    }
  };

  const login = (jwt: any) => {
    localStorage.setItem("jwt", jwt);
    setAuth(jwt_decode(jwt));
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuth(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, getUserData, updateUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
