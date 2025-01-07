import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import Carousel from 'react-bootstrap/Carousel';

const Mobile = () => {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("smartphones");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((response) => {
        console.log("response", response);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [category]);
  return (
    <div>

    {/* Crousel div */}
<div>
          
          <Carousel>
        <Carousel.Item interval={1000}>
        <img src="https://miro.medium.com/v2/resize:fit:1200/1*CKQ_3GHVoEqboSmqN_ONiw.jpeg" alt=""  style={{width:"100vw" , height:"90vh"}}/>
          <Carousel.Caption>
            <h3>Iphones</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
        <img src="https://www.zdnet.com/a/img/resize/b3c8d204ad96a06bb74a0941ab32c67a5b152ac8/2023/03/06/d3777b0d-b804-4cbf-b413-09b81bd91bfe/ipad-pro.jpg?auto=webp&fit=crop&height=900&width=1200" alt=""  style={{width:"100vw" , height:"90vh"}}/>
          <Carousel.Caption>
            <h3>Ipad</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
  
  
  
        <Carousel.Item>
        <img src="https://www.digitaltrends.com/wp-content/uploads/2023/02/macbook-pro-14-m2-max.jpg?fit=1425%2C896&p=1" alt=""  style={{width:"100vw" , height:"90vh"}}/>
          <Carousel.Caption>
            <h3>Laptops</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
        <Carousel.Item>
        <img src="https://skastl.at/wp-content/uploads/2024/07/post_photo-8-1020x600.webp" alt=""  style={{width:"100vw" , height:"90vh"}}/>
          <Carousel.Caption>
            <h3>Mobile Accessories</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
  
  
        
      </Carousel>
          </div>
  

      {/* category option div */}
      <div
        className="container d-flex justify-content-between align-items-center my-5 p-2"
        style={{ backgroundColor: "#f1e9e9" }}
      >
        {/* category name */}
        <div>
          <h2>{category.toUpperCase()}</h2>
        </div>

        {/* Category name Dropdown */}
        <div>
          <span style={{ padding: "5px" }}>Category:</span>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <option value="smartphones" className="options">
              Smart Phones 
            </option>
            <option value="tablets" className="options">
            Tablets
            </option>
            <option value="laptops" className="options">
            Laptops
            </option>
            <option value="mobile-accessories" className="options">
            Mobile Accessories
            </option>
          </select>
        </div>
      </div>

      {/* Products result */}
      <div className="container d-flex flex-wrap justify-content-center align-items-center gap-4 pt-4">
        {products.map((ele, index) => (
          <Link
            to={`/detail/${ele?.id}`}
            key={index}
            className="text-decoration-none"
          >
            <Card
              key={index}
              style={{ width: "18rem", height: "100%",textAlign:"center" }}
              className="shadow mycard"
            >
              <Card.Img variant="top" src={ele?.images[0]} height={300} />
              <Card.Body>
                <Card.Title>{ele?.title}</Card.Title>
                <Card.Text>
                  <h5 style={{ color: "black" }}>Rs: {ele?.price}$</h5>
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>


    </div>
  );
};

export default Mobile;
