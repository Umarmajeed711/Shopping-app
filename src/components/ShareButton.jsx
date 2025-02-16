import React from "react";
import { Button } from "react-bootstrap";
import { IoIosShareAlt } from "react-icons/io";
import { FaRegShareFromSquare } from "react-icons/fa6";
import './nav.css'

const ShareButton = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support the Web Share API.");
    }
  };

  return (
    // <Button variant="primary"  onClick={handleShare}>
    // share
    // </Button>
     <p className="share" onClick={handleShare}>
     < FaRegShareFromSquare  />   <span className="shareText">share</span> 
</p>
  );
};

export default ShareButton;
