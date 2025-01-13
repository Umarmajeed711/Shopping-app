import React, { useContext, useEffect, useState } from 'react'
import { Container} from 'react-bootstrap'
import { Link } from 'react-router'
import "./nav.css"
import { GlobalContext } from '../context/Context'
const NavBar = () => {

   let {state , dispatch} = useContext(GlobalContext);

  //  const [logout,setlogout] = useState(true)

  const userLogout = () => {
    localStorage.removeItem("userToken");
    dispatch({type: "USER_LOGOUT"})
    // setlogout(false)
  }


  // useEffect(() => {
  //   alert("Do you want to logout?")
  // },[logout])
  return (
    
     <div  style={{backgroundColor:"#f1e9e9", borderBottom:"1px solid black"}} >
    <div className='container navbar'>
          
          <h1 style={{textShadow: "10px 10px 20px rgba(0,0,0,0.1) "}}>HUB</h1>
          
          <nav>
            <ul className='d-flex column-gap-5 '>
              <li><Link to={"/home"}   className='link'>Home</Link></li>
              <li><Link to={"/about"}  className='link' >About</Link></li>
              <li><Link to={"/contact"}   className='link' >Contact</Link></li>
              <li><Link to={"/profile"}   className='link'>Profile</Link></li>
              <button   className='logout' onClick={userLogout} >Logout</button>
            </ul>
          </nav>
        </div>
        </div>
  )
}

export default NavBar