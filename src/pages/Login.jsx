import React from "react";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router";

const Login = () => {
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
      userName:"",
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
          navigateToHome("/");
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height:"100vh",
            
          }}
        >
          <div style={{border:"1px solid black",margin:"50px", padding:"20px",
            display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",height:"50%",

            border:" 2px solid #1976D2",
            borderRadius:"5px"
          }}>
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
