import React, { useContext, useState, useEffect } from "react";
import Typewriter from "./TypeWriter";
import "./home.css";
import { initializeApp } from "firebase/app";
import Swal from "sweetalert2";
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
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { GlobalContext } from "../context/Context";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";
import ShareButton from "../components/ShareButton";

export const Post = () => {

  const postUrl = window.location.href; // Get the current page URL

  // content api
  let { state, dispatch } = useContext(GlobalContext);

  // state for postCaption and post
  const [postCaption, setPostCaption] = useState("");
  const [post, setPost] = useState([]);

  const auth = getAuth();
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore();
  
  
  


  // state for upload Image
  const [uploadImage, setUploadImage] = useState()

// function for show post name
const [FileName,setFileName] = useState("")




  // function for add post
  const addPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("upload_preset", "post-image");

    try {
      // if user upload image the condition of if will true and run this code 
      if(uploadImage){
      const res = await axios.post("https://api.cloudinary.com/v1_1/djhltc7rf/upload", formData);
      console.log("Upload Image", res.data.url);

      const docRef = await addDoc(collection(db, "posts"), {
        userId: state?.user?.uid,
        caption: postCaption,
        authorName: state?.user?.displayName,
        authorProfile: state?.user?.photoURL,
        postImage: res.data.url,
        // postDate: new Date().getTime(),
        postDate: serverTimestamp(),
        liked: 0,
        comments: [
          "Its my first comment"
          ]
        
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
              }
            });
            Toast.fire({
              icon: "success",
              title: "Post successfully"
            });

      console.log("Document written with ID: ", docRef.id);
      setPostCaption("");
      setUploadImage("");
      setFileName("")
    }else{
      // if the user is not upload the image , this code will run
      const docRef = await addDoc(collection(db, "posts"), {
        userId: state?.user?.uid,
        caption: postCaption,
        authorName: state?.user?.displayName,
        authorProfile: state?.user?.photoURL,
        postDate: serverTimestamp(),
        liked: 0,
        comments: [
          "Its my first comment"
          ]
        
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
              }
            });
            Toast.fire({
              icon: "success",
              title: "Post successfully"
            });
      console.log("Document written with ID: ", docRef.id);
      setPostCaption("");
      setUploadImage("");
    }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  useEffect(() => {
    let unsubscribe;

    // function for get real time data
    const getRealTimeData = async () => {
      const q = query(collection(db, "posts"),orderBy("postDate", "desc"));
       unsubscribe = onSnapshot(q, (querySnapshot) => {
        const realTimePost = [];
        querySnapshot.forEach((doc) => {
          realTimePost.push({...doc.data(), id : doc.id});
          
        });
        setPost(realTimePost);
        console.log(realTimePost);
        
      });
    };
    getRealTimeData();

    // function for disconnect the connect of page to the database
    return () => {
      unsubscribe();
    }
  },[] );

  // changes
  const [changelike,setChangelike] = useState("")
  const [currentPostId, setCurrentPostId] = useState("");
   // edit post
   const editPost = (editlike, id) => {

   console.log("edit like" ,editlike);
   console.log("id" , id);
   
   
    setChangelike(editlike + 1 );
    setCurrentPostId(id);
    console.log("changelike" , changelike);
    console.log("currentPostId" , currentPostId);

    updatePost()
    
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Post liked"
    });
  };
  console.log("changelike" , changelike);
  console.log("currentPostId" , currentPostId);

   const updatePost = async () => {
    // setChangelike(editlike + 1);
    // setCurrentPostId(id);
      await updateDoc(doc(db, "posts", currentPostId), {
        "liked": changelike    
      });  
    };


    // comment 

    const [newComment,setNewComment] = useState();
    const [allcomment,setAllComments] = useState()
    const [commentId,setCommentId] = useState("");
    

    const submitComment = (e,prevComments,postId) => {
      e.preventDefault()
      console.log(prevComments);
      setCommentId(postId)
      console.log(postId);
      
     
      
      let myallComments = []
      myallComments.push(...prevComments, newComment)
    setAllComments(myallComments);
    console.log(myallComments);
    
 
     updateComment();
     setNewComment("")
     console.log("add comment");
     

    }

    const updateComment = async () => {
        await updateDoc(doc(db, "posts", commentId), {
          "comments": allcomment,    
         

        });  
      };

      const [showComment,setShowComment] = useState(false)
  
  
  return (
    <div className="home">
      <div
        className="d-flex justify-content-start mt-5 flex-column align-items-center"
        style={{ minHeight: "100vh" , color: "#fff"}}
      >
        {/* <Typewriter text="" delay={100} /> */}

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
        

        <div className="d-flex flex-column gap-2 mt-3">
          {post.map((singlePost, i) => {
            return (
              <div key={i} className="post">
                {/* user Detail */}
                <div className="d-flex gap-2">
                  <div className="userImage">
                    <img
                      src={singlePost.authorProfile}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius:"50%"
                      }}
                      onError={(e)=>{e.target.src="/image.png"}}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <p className="userName">{singlePost.authorName}</p>
                    <p className="postTime">
                      {/* {moment(singlePost.postDate).fromNow()} */}
                  
                  
                    {singlePost?.postDate?.seconds ? moment((singlePost?.postDate?.seconds * 1000)).fromNow() : "Just Now"}
                   </p>
                  
                  </div>
                </div>
                  
                  
                {/* post Caption */}

                <div>{singlePost.caption}</div>

                {/* post Image */}

                {(singlePost?.postImage) ?
                  
                    <img src={singlePost?.postImage} alt="" style={{width: "100%",height:"220px"}} />
                  :
                  null
                }
                <div className="d-flex justify-content-between">
                  <p className="totalLikes"><AiFillLike/><FcLike/> {singlePost?.liked} </p>
                  <p className="totalLikes">{singlePost?.comments?.length} comments </p>
                  <p className="totalLikes">15k shares</p>
                </div>

                {/* comment section */}
                {
                  (showComment) ?
                
                <div className="commentSection">
                   <IoArrowBackSharp  onClick={() => {setShowComment(false)}} className="like"/>
                   <div className="postComment">
                    {singlePost?.comments?.map( (comment,i) => {
                      return(
                      <div key={i}>
                        <div className="singleComment">
                         {comment}
                         </div>

                      </div>

                      )
                    })}
                   </div>
                   <form onSubmit={(e) => {submitComment(e,singlePost.comments,singlePost.id,state?.user?.displayName,state?.user?.photoURl)}} className="d-flex align-items-center">
                         <input type="text" placeholder="write a comment..." value={newComment} className="commentField" required onChange={(e) => {setNewComment(e.target.value)} } />
                         <button className="sendButton"><RiSendPlane2Fill /></button>
                    </form>
                </div>
                : null

                  }

                {/* like and share button */}
                <div className="d-flex justify-content-between ">
                  <p className="like"  onClick={() => {
                        editPost(singlePost?.liked, singlePost?.id);
                      }}> 
                     <BiLike className="likeIcon" /> <span className="likeText">like</span>
                  </p>
                  <p className="like" onClick={() => {setShowComment((oldValue) => !oldValue)}}>
                   <FaRegCommentDots />   <span className="likeText">comments</span>
                  </p>
                  <ShareButton title={singlePost.name} text={singlePost.caption} url={postUrl} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
