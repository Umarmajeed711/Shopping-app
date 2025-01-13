import React, { useContext } from "react";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { GlobalContext } from "../context/Context";
import "./home.css";

import logo from "../assets/image.png";

const Login = () => {
  // context api
  let { state, dispatch } = useContext(GlobalContext);
  // state =  get the value
  // dispatch = set the value

  // State for error Message
  const [errorMessage, setErrorMessage] = useState("");

  // State for alert
  const [alertOpen, setAlertOpen] = useState(false);

  // Function for close alert
  const alertClose = () => {
    setAlertOpen(false);
  };

  // store useNavigate() hook in a const , for the navigation
  const navigateToHome = useNavigate();

  // login Validation
  const loginValidaiton = yup.object({
    userName: yup.string().required("Name is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "Minimun 6 character")
      .max(12, "Maximun 12 charachters"),

    // regax code for password validation
    // matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$" ,
    //  "Minimum eight and maximum 10 characters, at least one uppercase letter,
    //  one lowercase letter, one number and one special character")
  });

  // initailizes the loginFormik
  const loginFormik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    validationSchema: loginValidaiton,

    onSubmit: (values) => {
      axios
        .post("https://dummyjson.com/auth/login", {
          username: values.userName,
          password: values.password,
        })
        .then((response) => {
          console.log("response :", response);
          // here we are set the type is "USER_LOGIN" and payload = response.data;
          dispatch({ type: "USER_LOGIN", payload: response.data });

          // save the access token in the local storage
          localStorage.setItem("userToken" , response?.data?.accessToken)

          // navigate to the home page
          setTimeout(() => {navigateToHome("/home")}, 5)
        })
        .catch((error) => {
          console.log("Error :", error);
          setErrorMessage(error.response?.data?.message);
          setAlertOpen(true);
        });
    },
  });
  return (
    <div>
      <form onSubmit={loginFormik.handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {/* login div */}
          <div
            className="d-flex justify-content-evenly gap-5 align-items-center p-5"
            style={{
              border: " 2px solid gray",
              height: "60%",
              borderRadius: "5px",
              boxShadow: "0 0 5px black",
              backgroundColor: "#f1e9e9",
            }}
          >
            {/* image div */}
            <div>
              <h3 style={{ textAlign: "center" }}>HUB</h3>
              <img
                src={logo}
                alt="logo"
                width={200}
                height={200}
                style={{ borderRadius: "50%", boxShadow: "0 0 5px black" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#f1e9e9",
                  textShadow: "1px 1px 5px rgba(0,0,0,1)",
                }}
              >
                Login
              </h1>
              {/* user Name input field */}
              <TextField
                name="userName"
                label="User Name"
                value={loginFormik.values.userName}
                onChange={loginFormik.handleChange}
                error={
                  loginFormik.touched.userName &&
                  Boolean(loginFormik.errors.userName)
                }
                helperText={
                  loginFormik.touched.userName && loginFormik.errors.userName
                }
              />

              <br />

              {/* password Input field */}

              <TextField
                name="password"
                label="password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                error={
                  loginFormik.touched.password &&
                  Boolean(loginFormik.errors.password)
                }
                helperText={
                  loginFormik.touched.password && loginFormik.errors.password
                }
              />

              <br />

              {/* login Button */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button color="primary" variant="outlined" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </div>
          {/* Snackbar for showing error */}
          <Snackbar
            open={alertOpen}
            autoHideDuration={3000}
            onClose={alertClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={alertClose} severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
      </form>
    </div>
  );
};

export default Login;
