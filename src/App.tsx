import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/global.css";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthRoute from "./utils/AuthRoute";
import Products from "./pages/Products";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={<AuthRoute component={Products} />}
          />
          <Route path="/*" element={<AuthRoute component={Products} />} />
        </Routes>
        <div className="w-full bg-stone-900 h-10 mt-auto"></div>
      </AuthProvider>
    </div>
  );
}

export default App;
