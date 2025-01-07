import React from 'react'
import { Container} from 'react-bootstrap'
import { Link } from 'react-router'
import "./nav.css"
const NavBar = () => {
  return (
    
     <div  style={{backgroundColor:"#f1e9e9", borderBottom:"1px solid black"}} >
    <div className='container navbar'>
          
          <h1 style={{textShadow: "10px 10px 20px rgba(0,0,0,0.1) "}}>Shopping</h1>
          
          <nav>
            <ul className='d-flex column-gap-5 '>
              <li><Link to={"/"}   className='link'>Home</Link></li>
              <li><Link to={"/about"}  className='link' >About</Link></li>
              <li><Link to={"/contact"}   className='link' >Contact</Link></li>
              <li><Link to={"/login"}   className='link'>Login</Link></li>
            </ul>
          </nav>
        </div>
        </div>
  )
}

export default NavBar