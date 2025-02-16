import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
// import { useNavigate } from 'react-router';
import "../App.css";
// import yup
import * as yup from "yup";

// import formik hook
import { useFormik } from "formik";
import { Link } from "react-router";
import './login.css'

const Signup = () => {
  // const navigate = useNavigate()

  const auth = getAuth();

  // const createUser = (e) => {
  //     e.preventDefault();

  //     createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //         // Signed up
  //         const user = userCredential.user;
  //         console.log("Res" , user)

  //          // update profile function
  //         updateProfile(auth.currentUser, {
  //           displayName:userName, photoURL: "https://example.com/jane-q-user/profile.jpg"
  //         }).then(() => {

  //           console.log("Profile Updated")
  //           // Profile updated!
  //           // ...
  //         }).catch((error) => {
  //           console.log("Update Profile Err" , error)
  //             // An error occurred
  //             // ...
  //         });

  //         // ...
  //     })
  //     .catch((error) => {
  //         console.log("err" , error)
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         alert(errorMessage)
  //         // ..
  //     });
  //  }

  // Sign Up Login Validation
  const signUpValidation = yup.object({
    userName: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("enter a valid email")
      .required("email is Required"),
    password: yup
      .string("Enter Password")
      .required("Password is Required")
      .min(6, "Minimum 6 characters")
      .max(12, "Maximum 12 Characters"),
  });

  const signUpformik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      console.log("values", values);

      // function for singup
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("Res", user);

          // update profile function
          updateProfile(auth.currentUser, {
            displayName: values.userName,
            photoURL: "https://en.m.wikipedia.org/wiki/File:Breezeicons-actions-22-im-user.svg",
          })
            .then(() => {
              console.log("Profile Updated");
              // Profile updated!
              
              // ...
            })
            .catch((error) => {
              console.log("Update Profile Err", error);
              // An error occurred
              // ...
            });

          // ...
        })
        .catch((error) => {
          console.log("err", error);
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    },
  });

  return (
    <div className="body">
      <form onSubmit={signUpformik.handleSubmit} className="formDiv p-4  ">
        <div className="loginHeading my-3">Sign up</div>

        <div className="inputBox">
          <input
            type="text"
            name="userName"
            value={signUpformik.values.userName}
            onChange={signUpformik.handleChange}
          />
          <span>Name</span>
          {signUpformik.touched.userName &&
          Boolean(signUpformik.errors.userName) ? (
            <p className="requiredError">
              {signUpformik.touched.userName && signUpformik.errors.userName}
            </p>
          ) : null}
        </div>
        <br />
        <div className="inputBox">
          <input
            type="text"
            name="email"
            value={signUpformik.values.email}
            onChange={signUpformik.handleChange}
          />
          <span>Email</span>
          {signUpformik.touched.email && Boolean(signUpformik.errors.email) ? (
            <p className="requiredError">
              {signUpformik.touched.email && signUpformik.errors.email}
            </p>
          ) : null}
        </div>
        <br />
        <div className="inputBox">
          <input
            type="text"
            name="password"
            value={signUpformik.values.password}
            onChange={signUpformik.handleChange}
          />
          <span>Password</span>
          {signUpformik.touched.password &&
          Boolean(signUpformik.errors.password) ? (
            <p className="requiredError">
              {signUpformik.touched.password && signUpformik.errors.password}
            </p>
          ) : null}
        </div>

        <br />
        <button className="button" type="submit">
          Signup
        </button>
        <br />
        <div>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="forget">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
