import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NoFound from '../pages/NoFound'
import Mens from '../pages/Mens'
import ProductDetail from '../pages/ProductDetail'
import Women from '../pages/Womens'
import Mobile from '../pages/Mobile'

const MyRoute = () => {
  return (
    <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Women />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/not-found" element={<NoFound />} />
          <Route path='*' element={<Navigate to={"/not-found"} />} />
        </Routes>
    </div>
  )
}

export default MyRoute