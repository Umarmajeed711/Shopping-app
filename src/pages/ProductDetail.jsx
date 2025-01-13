import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Rating from "@mui/material/Rating";
import "./product.css"
import Cart from "./Cart";

const ProductDetail = () => {
  const { id } = useParams();

  const [productDetail, setProductDetail] = useState({});
  const [counter,setCounter] = useState(1)


 

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        console.log("response", response);
        setProductDetail(response?.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const increaseCounter = () => {
    
      setCounter(counter + 1);

  }

  const decreaseCounter = () => {
    if(counter > 1){
      setCounter(counter - 1);
    }
  }

  return (
    <div>
      {/* card details */}
      <div
        className="detailCard mx-auto mt-5  border"
        style={{ width: "80vw" }}
      >
        {/* image div */}
        <div style={{ width: "40vw", textAlign: "center" }}>
          <img src={productDetail?.thumbnail} alt="" width="100%" height={600} />
        </div>

        {/* product details */}
        <div style={{ width: "40vw" }} className="productDetails">
          <h1>{productDetail?.title}</h1>
          <h5>Rs: {productDetail?.price}</h5>
          <Rating
            name="half-rating-read"
            defaultValue={productDetail?.rating}
            precision={0.5}
            readOnly
          />
          <p>{productDetail?.description}</p>

          <h5>Stock: {productDetail?.stock}</h5>
          <p>Shipping Information: {productDetail?.shippingInformation}</p>
          <p>Warranty Information: {productDetail?.warrantyInformation}</p>
          <hr />

          {/* Other Details */}
          <p className="gray">SKU: {productDetail?.sku}</p>
          <p className="gray">Category: {productDetail?.category}</p>
          <p className="d-flex gray">
            Tags:
            {productDetail?.tags?.map((ele, i) => {
              return (
                <div key={i}>
                  <div>
                    <span>`{ele}`</span>
                  </div>
                </div>
              );
            })}
          </p>

          {/* Add to card Details */}
          <div>
            <span className="add">
              <span>
                <button onClick={decreaseCounter} className="addButton">
                  -
                </button>
              </span>
              <span className="counter">{counter}</span>
              <span>
                {" "}
                <button onClick={increaseCounter} className="addButton">
                  +
                </button>
              </span>
            </span>

            <p>
              <button class="addCard" >Add to Card</button>
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}

      <h3 className="container px-5 mt-3">Ratings/Reviews:</h3>
      <div className="d-flex flex-column justify-content-center align-items-center row-gap-4">
        {productDetail?.reviews?.map((ele, i) => {
          return (
            <div
              className="card p-3 shadow mt-3"
              key={i}
              style={{ width: "60vw" }}
            >
              <div className="">
                <p>{ele?.reviewerName}</p>
                <p>{ele?.reviewerEmail}</p>
              </div>

              <p>{ele?.comment}</p>

              <p className="d-flex  align-content-center">
                Rating:
                <Rating
                  name="half-rating-read"
                  defaultValue={ele.rating}
                  precision={0.5}
                  readOnly
                />
              </p>
            </div>
          );
        })}
      </div>


       <Cart product={productDetail} counter={counter}/>
    </div>
  );
};

export default ProductDetail;
