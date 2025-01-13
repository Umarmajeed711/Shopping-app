import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NoFound from "../pages/NoFound";
import Mens from "../pages/Mens";
import ProductDetail from "../pages/ProductDetail";
import Women from "../pages/Womens";
import Mobile from "../pages/Mobile";
import { GlobalContext } from "../context/Context";
import { CircularProgress } from "@mui/material";
import { Profile } from "../pages/Profile";
import Cart from "../pages/Cart";

const MyRoute = () => {
  let { state, dispatch } = useContext(GlobalContext);
  
  return (
    <div>
      {(state.isLogin  == true) ? 
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Women />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          {/* <Route path="/detail/:id" element={<Cart />} /> */}
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/not-found" element={<NoFound />} />
          <Route path="*" element={<Navigate to={"/not-found"} />} />
        </Routes>
        : (state.isLogin == false)?  
         <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes> 
        :

        <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
        <CircularProgress size={250} />
        </div>
       } 
    </div>
  );
};

export default MyRoute;
