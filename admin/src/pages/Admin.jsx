import React from "react";
import Sidebar from "../components/Sidebar";
import Addproduct from "../components/Addproduct";
import Listproduct from "../components/Listproduct";
import { Routes, Route } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/listproduct" element={<Listproduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
