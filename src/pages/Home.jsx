import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router';
import './home.css'
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {

    const [products , setProducts] = useState([]);

    const [category, setCategory] = useState("beauty");

    useEffect(() => {

      // its a link to get all products
      // https://dummyjson.com/products
      
        axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
            console.log("response" , response)
            setProducts(response.data.products);
        }).catch((error) => {
            console.log("Error", error);
        })
    }, [category])

    return (
      <div className="">
        <div>

        <Carousel>
      <Carousel.Item interval={1000}>
      <img src="https://burst.shopifycdn.com/photos/makeup-beauty-flatlay.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt=""  style={{width:"100vw" , height:"90vh"}}/>
        <Carousel.Caption>
          <h3>Beauty</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img src="https://media.allure.com/photos/61f0188efd505011ae4dd7c9/16:9/w_2560%2Cc_limit/truth%2520about%2520functional%2520fragrance.jpg" alt=""  style={{width:"100vw" , height:"90vh"}}/>
        <Carousel.Caption>
          <h3>Fragnance</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>



      <Carousel.Item>
      <img src="https://obsessionoutlet.com/wp-content/uploads/Top-10-Trendy-Furniture-Design-in-2020.jpg" alt=""  style={{width:"100vw" , height:"90vh"}}/>
        <Carousel.Caption>
          <h3>Furniture</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src="https://media.licdn.com/dms/image/D4D12AQHA8YPlqT0fig/article-cover_image-shrink_720_1280/0/1723205024094?e=2147483647&v=beta&t=ODcpkSPb_tpEtZ36bMY09NzQZjJ2LujcprclkqOTqAk" alt=""  style={{width:"100vw" , height:"90vh"}}/>
        <Carousel.Caption>
          <h3>Grocery</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>


      <Carousel.Item>
      <img src="https://cdn.shopify.com/s/files/1/0070/7032/files/how-to-start-a-skincare-line-glow-oasis.jpg?v=1666895341" alt=""  style={{width:"100vw" , height:"90vh"}}/>
        <Carousel.Caption>
          <h3>Skin Care</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
        
        {/* TOp Collections */}
        <h3 className='mt-5 ' style={{textAlign:"center"}}>Top Collections</h3>
        <div className='Top my-5'>
         <div className='topSearch'>
           <Link to={"/mens"} className='toplinks'>Mens</Link>
         </div>
         <div className='topSearch'>
         <Link to={"/womens"} className='toplinks'>Womens</Link>
         </div>
         <div className='topSearch'>
         <Link to={"/mobile"}  className='toplinks'>Mobiles</Link>
         </div>
        </div>

        {/* category option div */}
        <div className='container d-flex justify-content-between align-items-center my-5 p-2' style={{backgroundColor:"#f1e9e9"}}>

          {/* category name */}
          <div><h2>{category.toUpperCase()}</h2></div>

          {/* Category name Dropdown */}
          <div >
            <span style={{padding:"5px"}}>Category:</span>
            <select onChange={(e) => {setCategory(e.target.value)}} value={category}>
              <option value="beauty" className='options'>Beauty</option>
              <option value="fragrances" className='options'>Fragnance</option>
              <option value="furniture" className='options'>Furniture</option>
              <option value="groceries" className='options'>Groceries</option>
              <option value="home-decoration" className='options'>Home Decoration</option>
              <option value="kitchen-accessories" className='options'>Kitchen-Accessories</option>
              <option value="skin-care" className='options'>Skin-Care</option>
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
              <Card key={index} style={{ width: "18rem", height:"100%" ,textAlign:"center"
              }} className="shadow  mycard">
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
}

export default Home