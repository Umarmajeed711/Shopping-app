import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Context";

import {
  getAuth,
  sendEmailVerification,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import "./profile.css";
import './home.css'
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { FaRegShareFromSquare } from "react-icons/fa6";
// material ui
// Snackbar
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
// alert
import Alert from "@mui/material/Alert";
// modal
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  // context api

  let { state, dispatch } = useContext(GlobalContext);

  const auth = getAuth();

  // state for show edit email modal
  const [editEmail, setEditEmail] = useState(false);
  // new email hook
  const [newEmail, setNewEmail] = useState("");

  // function for edit email
  const changeEmail = (e) => {
    e.preventDefault();

    verifyBeforeUpdateEmail(auth.currentUser, newEmail)
      .then(() => {
        // Email updated!
        console.log("Email Updated");
        handleClose();
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log("Update Email Error", error);
        // ...
      });
  };

  //  function for email verification
  const [open, setOpen] = useState(false);

  const emailVerified = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        console.log("Email verification sent!");
        setOpen(true);
        // ...
      })
      .catch(() => {
        console.log("Verification not sent");
      });
  };

  //  function for email verification
  const [showName, setshowName] = useState(false);
  const [newName, setNewName] = useState("");

  const editName = () => {
    // update profile function
    updateProfile(auth.currentUser, {
      displayName: newName,
      photoURL:
        "https://en.m.wikipedia.org/wiki/File:Breezeicons-actions-22-im-user.svg",
    })
      .then(() => {
        console.log("Profile Updated");
        alert("Name Edit Successfully");
        handleClose();
        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log("Update Profile Err", error);
        // An error occurred
        // ...
      });

    // ...
  };

  // fucntions and states for add post
  // state for postCaption
  const [postCaption, setPostCaption] = useState("");
  // state for store post
  const [post, setPost] = useState([]);
  // state for upload Image
  const [uploadImage, setUploadImage] = useState();
  // function for show post name
  const [FileName,setFileName] = useState("")

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore();

  // function for add post

  const addPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("upload_preset", "post-image");

    try {
      // if user upload image the condition of if will true and run this code
      if (uploadImage) {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/djhltc7rf/upload",
          formData
        );
        console.log("Upload Image" , res.data);

        const docRef = await addDoc(collection(db, "posts"), {
          userId: state?.user?.uid,
          caption: postCaption,
          authorName: state?.user?.displayName,
          authorProfile: state?.user?.photoURL,
          postImage: res.data.url,
          postDate: serverTimestamp()
        });

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Post successfully",
        });
        console.log("Document written with ID: ", docRef.id);
        setPostCaption("");
        setUploadImage("");
        setFileName("")
      } else {
        // if the user is not upload the image , this code will run
        const docRef = await addDoc(collection(db, "posts"), {
          userId: state?.user?.uid,
          caption: postCaption,
          authorName: state?.user?.displayName,
          authorProfile: state?.user?.photoURL,
          postDate: serverTimestamp(),
        });

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Post successfully",
        });

        console.log("Document written with ID: ", docRef.id);
        setPostCaption("");
        setUploadImage("");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // delete post
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));


    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Post Delete",
    });
  };

  const [currentCaption, setCurrentCaption] = useState("");
  const [currentPostId, setCurrentPostId] = useState("");
  const [show, setShow] = useState(false);
  // edit post
  const editPost = (caption, id) => {
    setShow(true);
    setCurrentCaption(caption);
    setCurrentPostId(id);
  };

  const updatePost = async () => {
    await updateDoc(doc(db, "posts", currentPostId), {
      caption: currentCaption,
    });
    handleClose();
  };

  useEffect(() => {
    let unsubscribe;

    // function for get real time data
    const getRealTimeData = async () => {
      const q = query(
        collection(db, "posts"),
        where("userId", "==", state.user.uid),
        // orderBy("postDate", "desc")
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const realTimePost = [];
        querySnapshot.forEach((doc) => {
          realTimePost.push({ ...doc.data(), id: doc.id });
        });
        setPost(realTimePost);
        console.log(realTimePost);
      });
    };
    getRealTimeData();

    // function for disconnect the connect of page to the database
    return () => {
      unsubscribe();
    };
  }, []);

  // fucntion for handle close when any event perform
  const handleClose = () => {
    setOpen(false);
    setEditEmail(false);
    setNewEmail("");
    setshowName(false);
    setNewName("");
    setShow(false);
    setCurrentCaption("");
    setCurrentPostId("");
  };

  return (
    <div className="home">
      <div
        className="d-flex flex-column align-items-center gap-4  mt-5 "
        style={{ minHeight: "100vh" }}
      >
        {/* div for user profile info */}
        <div className="d-flex flex-column p-3 align-items-center profile">
          <div style={{ width: "100px", height: "100px" }}>
            <img
              src={state?.user?.photoURL}
              // "/image.png"
              alt="userImage"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              onError={(e) => {
                e.target.src = "/image.png";
              }}
            />
          </div>
          <div>
            <h1
              style={{ textAlign: "center", marginTop: "10px" }}
              onClick={() => {
                setshowName(true);
              }}
            >
              {state?.user.displayName}
            </h1>
            <p className="mt-1">
              email: {state?.user?.email}
              <MdEdit
                onClick={() => {
                  setEditEmail(true);
                }}
                className="editIcon"
              />
            </p>
            <p>
              email verified:{" "}
              {state?.user?.emailVerified ? (
                <span className="verified">Verified </span>
              ) : (
                <span className="verifyNow " onClick={emailVerified}>
                  Verify now
                </span>
              )}{" "}
            </p>
          </div>
        </div>

        {/* form for add post */}
        <form onSubmit={addPost} className="d-flex flex-column gap-2">
          <textarea
            className="textArea"
            placeholder="What's on your mind?"
            value={postCaption}
            required
            onChange={(e) => {
              setPostCaption(e.target.value);
            }}
          ></textarea>
          <div className='FileDiv' >
           
           
           {(FileName) ?  `File select: ${FileName}` : <h1 style={{cursor:"pointer"}}>+</h1> }

            <input
              type="file"
              onChange={(e) => {
                setUploadImage(e.target.files[0]);
                setFileName(e?.target?.files[0]?.name);
                
              }}
              style={{width:"100%", height:"100%",position:"absolute",opacity:"0"}}
            />
            
            
          </div>
          <button className="postbutton" type="submit">
            post
          </button>
        </form>

        {/* for showing all the post of user */}
        <div className="d-flex flex-column gap-2 mt-3">
          {post.map((singlePost, i) => {
            return (
              <div key={i} className="post">
                {/* user Detail */}
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-2">
                    <div className="userImage">
                      <img
                        src={singlePost.authorProfile}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                        }}
                        onError={(e) => {
                          e.target.src = "/image.png";
                        }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="userName">{singlePost.authorName}</p>
                      <p className="postTime">
                        {/* {moment(singlePost.postDate).fromNow()} */}

                        {singlePost?.postDate?.seconds
                          ? moment(
                              singlePost?.postDate?.seconds * 1000
                            ).fromNow()
                          : "Just Now"}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <p
                      onClick={() => {
                        editPost(singlePost.caption, singlePost?.id);
                      }}
                      
                    >
                      <MdOutlineModeEditOutline className="editIcon" />
                    </p>

                    <p
                      onClick={() => {
                        Swal.fire({
                          title: "Do you want delete this post?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Delete",
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            deletePost(singlePost.id);
                            // Swal.fire("Saved!", "", "success");
                          }
                        });
                      }}
                    >
                      <FiDelete className="editIcon" />
                    </p>
                  </div>
                </div>

                {/* post Caption */}

                <div>{singlePost.caption}</div>

                {/* post Image */}

                {singlePost?.postImage ? (
                  <img
                    src={singlePost?.postImage}
                    alt=""
                    style={{ width: "100%", height: "220px" }}
                  />
                ) : null}

                {/* like and share button */}
                <div className="d-flex justify-content-between mt-3">
                  <p className="like">
                    like <BiLike />
                  </p>
                  <p className="like">
                    comments <FaRegCommentDots />
                  </p>
                  <p className="like">
                    share <FaRegShareFromSquare />
                    
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Snackbar */}
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            verification email sent!
          </Alert>
        </Snackbar>
      </div>

      {/* // Edit email modal */}
      <div>
        <Modal show={editEmail} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="">
              Enter New Email :{" "}
              <input
                type="email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={changeEmail}>
              Send Email
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* // Edit Name modal */}
      <div>
        <Modal show={showName} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="">
              Enter New Name :{" "}
              <input
                type="email"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={editName}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* // Edit post caption modal */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={currentCaption}
              onChange={(e) => {
                setCurrentCaption(e.target.value);
              }}
              className="w-100 py-2 px-1 rounded-2"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updatePost}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
