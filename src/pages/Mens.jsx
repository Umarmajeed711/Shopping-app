import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router";
import Carousel from "react-bootstrap/Carousel";

const Mens = () => {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("mens-shirts");

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
              src="https://shopgroove.pk/cdn/shop/files/OIG3--_2024-07-02T000706.693.jpg?v=1720786276"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Shirts</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTScWvTiTSVngDNwuYx7IY7ERDGSjmi5y-lTw&s"
              alt=""
              style={{ width: "100vw", height: "90vh" }}
            />
            <Carousel.Caption>
              <h3>Shoes</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              src="https://www.imperialhomes.pk/cdn/shop/products/3_4da55c5f-4b3e-4e43-94fd-254f2693a20e.png?v=1649395880&width=1080"
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
            <option value="mens-shirts" className="options">
              Mens Shirt
            </option>
            <option value="mens-shoes" className="options">
              Mens Shoes
            </option>
            <option value="mens-watches" className="options">
              Mens Watches
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

export default Mens;
