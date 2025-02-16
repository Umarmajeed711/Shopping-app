import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/Context";
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import './home.css'
import { Link } from "react-router";
import { TypeAnimation } from "react-type-animation";
import Typewriter from "./TypeWriter";
import ShareButton from "../components/ShareButton";
const Home = () => {
  const postTitle = "Awesome Post";
  const postText = "Check out this amazing post!";
  const postUrl = window.location.href; // Get the current page URL

  // new email hook
  const [newEmail, setNewEmail] = useState("");

  // show form hook
  const [showForm, setShowForm] = useState(false);

  // context api

  let { state, dispatch } = useContext(GlobalContext);

  const auth = getAuth();

  const changeEmail = (e) => {
    e.preventDefault();

    verifyBeforeUpdateEmail(auth.currentUser, newEmail)
      .then(() => {
        // Email updated!
        console.log("Email Updated");
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log("Update Email Error", error);
        // ...
      });
  };

  console.log("State", state);

  return (
    <div className="home" >
      <div className="d-flex  flex-column align-items-center  homePage" >

       <p style={{fontSize:"36px",fontWeight:"600"}}> WELCOME <Typewriter text={state?.user?.displayName?.toUpperCase()} delay={200} /></p>

        <p><Link to={'/profile'}  className="seeProfile">see your profile</Link></p>
  
        <ShareButton title={postTitle} text={postText} url={postUrl} />
      </div>

       
    </div>
  );
};

export default Home;
