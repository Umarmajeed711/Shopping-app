import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import Carousel from "react-bootstrap/Carousel";

const Women = () => {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("womens-bags");

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
            <img
              src="https://thepremiummart.pk/cdn/shop/files/WhatsApp_Image_2024-02-28_at_17.55.11_2_15d4b54c-f8d1-4a89-a75a-f58c2ebf74b8.jpg?v=1720021143&width=1445"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Bags</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              src="https://almascollections.com/cdn/shop/products/product-image-1520671110_1024x1024.jpg?v=1640333590"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Jewellery</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src="https://hutch.pk/cdn/shop/articles/Best-Womens-Watches-in-Pakistan.jpg?v=1714751107"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Watches</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src="https://images.pexels.com/photos/27035619/pexels-photo-27035619.jpeg?cs=srgb&dl=pexels-jose-martin-segura-benites-1422456152-27035619.jpg&fm=jpg"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Shoes</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src="https://i5.walmartimages.com/asr/421cbb4b-f95a-4f29-b5de-7dbd07124ec5.e659aa37b5de41649936a20adc361cc7.jpeg"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Tops</h3>
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
            <option value="womens-bags" className="options">
              Womens Bags
            </option>
            <option value="womens-dresses" className="options">
              Womens Dresses
            </option>
            <option value="womens-jewellery" className="options">
              Womens Jewellery
            </option>
            <option value="womens-shoes" className="options">
              Womens Shoes
            </option>
            <option value="womens-watches" className="options">
              Womens Watches
            </option>
            <option value="tops" className="options">
              Tops
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
              style={{ width: "18rem", height: "100%", textAlign: "center" }}
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

export default Women;
