import React from 'react'
import './like.css'
import { Link } from 'react-router'
import { FaRegCommentDots } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
export const Like = () => {

    const list = document.querySelectorAll(".list");
    function activeLinK () {
        list.forEach((item) => 
            item.classList.remove("active"));
        this.classList.add("active")
    }
    list.forEach((item) => 
    item.addEventListener("click",activeLinK))

  return (
    <div className='newNav'>
    <div className='navigation'>
        <ul>
            <li className='list active'>
                <Link className='a' to={"/home"}>
                 <span className='icon'><FaHome/></span>
                 <span className='text'>Home</span>
                </Link>
            </li>
            <li className='list'>
                <Link className='a' to={"/Post"}>
                 <span className='icon'><FaRegCommentDots/></span>
                 <span className='text'>Post</span>
                </Link>
            </li>
            <li className='list' >
                <Link className='a' to={"/home"}>
                 <span className='icon'><MdOndemandVideo/></span>
                 <span className='text'>Media</span>
                </Link>
            </li>
            <li className='list' >
                <Link className='a' to={"/home"}>
                 <span className='icon'><LiaUserFriendsSolid/></span>
                 <span className='text'>Friends</span>
                </Link>
            </li>
            <li className='list'  >
                <Link className='a' to={"/profile"}>
                 <span className='icon'><CgProfile/></span>
                 <span className='text'>Profile</span>
                </Link>
            </li>
            <div className='indicator'>

            </div>
        </ul>

    </div>
    </div>
  )
}
