import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router";
import "./nav.css";
import { GlobalContext } from "../context/Context";
import { getAuth, signOut } from "firebase/auth";
const NavBar = () => {
  let { state, dispatch } = useContext(GlobalContext);

  //  const [logout,setlogout] = useState(true)

  const auth = getAuth();

  const userLogout = () => {
    localStorage.removeItem("userToken");
    dispatch({ type: "USER_LOGOUT" });
    // setlogout(false)

    ////
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log("An error happened");
      });
  };

  return (
    <div className="header">
      <div className="container navbar">
        <h1 style={{ textShadow: "10px 10px 20px rgba(0,0,0,0.1) " }}>
          Social App
        </h1>

        <nav>
          <ul className="d-flex column-gap-4 column-gap-sm-5">
            {/* <li>
              <Link to={"/home"} className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/Post"} className="link">
                Posts
              </Link>
            </li>
            <li>
              <Link to={"/profile"} className="link">
                Profile
              </Link>
            </li> */}
            <button className="logout p-1" onClick={userLogout}>
              Logout
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
