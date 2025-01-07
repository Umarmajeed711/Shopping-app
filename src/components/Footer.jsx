import React from 'react'
import { Link } from 'react-router'
import "./footer.css"
export const Footer = () => {
  return (
    <div className='footer mt-5'>

        <div className='container p-5 d-flex justify-content-evenly gap-3' >

            <div className='d-flex justify-content-center align-items-center' style={{textAlign:"center",width:"20vw"}}>
                <p>400 University Drive Suite 200 Coral Gables,
                FL 33134 USA</p>
            </div>

            <div className='d-flex gap-5 '>
                <div className='d-flex flex-column row-gap-3'>
                    <h6>Links</h6>
                    <Link to={"/"} className='link'>Home</Link>
                    <Link to={"/about"} className='link'>About</Link>
                    <Link to={"/contact"} className='link'>Contact</Link>
                     <Link to={"/login"} className='link'>Login</Link>
                </div>


                <div className='d-flex flex-column row-gap-3'>
                    <h6>Help</h6>
                    <Link to={"/"} className='link'>Payment Options</Link>
                    <Link to={"/"} className='link'>Return</Link>
                    <Link to={"/"} className='link'>Privacy Policy</Link>
                </div>

                <div className='d-flex flex-column'>
                    <h6>News letter</h6>
                    <form className='d-flex gap-2'>
                        <input type="email" placeholder='Enter Your Email Address'required />
                        <input type="submit" value="SUBSCRIBE" className='subscribe' />
                    </form>
                </div>
            </div>
        </div>

        <hr />
        <p style={{textAlign:"center"}}>2024 Meubel House. All rights reverved</p>
    </div>
  )
}
