import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router";

const About = () => {
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
    <div >
      About
      <div>
        <div>All Products</div>
        <div>
          Category:
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          >
            <option value="smartphones">Smart phones</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragnance</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="home-decoration">Home Decoration</option>
            <option value="kitchen-accessories">Kitchen-accessories</option>
            <option value="skin-care">Skin Care</option>
          </select>
        </div>
      </div>
      <div className="container d-flex flex-wrap justify-content-center align-items-center gap-4 pt-4">
        {products.map((ele, index) => (
          <Link
            to={`/detail/${ele?.id}`}
            key={index}
            className="text-decoration-none"
          >
            <Card
              key={index}
              style={{ width: "18rem", height: "100%" }}
              className="shadow"
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

export default About;
