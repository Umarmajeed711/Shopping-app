import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword,
   signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
// import { useNavigate } from 'react-router';
import "../App.css";
// import yup
import * as yup from "yup";

// import formik hook
import { useFormik } from "formik";
import { Link } from "react-router";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import './login.css'


const Login = () => {
  const auth = getAuth();

 

  //  Login Validation
  const loginValidation = yup.object({
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

  const loginformik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      console.log("values", values);

      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Res", user);

          
          // ...
        })
        .catch((error) => {
          console.log("Err", error);
          const errorCode = error.code;

          const errorMessage = error.message;
          alert(errorMessage);
        });
    },
  });


  // forget password 

  const [show,setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // function for forget password
  const forgetPassword = () => {
    sendPasswordResetEmail(auth, userEmail)
  .then(() => {
    // Password reset email sent!
    console.log("Password reset email sent!");
    handleClose()
    
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  // function for close modals
  const handleClose = () => {
    setShow(false);
    setUserEmail("");
  }


 
// google auth provider
const Googleprovider = new GoogleAuthProvider();

const loginWithGoogle = () => {

  signInWithPopup(auth, Googleprovider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    
    // ...
  });

}


// Login with Github


const Githubprovider = new GithubAuthProvider();
const loginWithGithub = () => {

  signInWithPopup(auth, Githubprovider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user);
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
}
 





  return (
    <div className="body">
      <form onSubmit={loginformik.handleSubmit} className="formDiv p-4  ">
        <div className="loginHeading my-3">
          Login
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="email"
            value={loginformik.values.email}
            onChange={loginformik.handleChange}
          />
          <span>Email</span>
          {loginformik.touched.email && Boolean(loginformik.errors.email) ? (
            <p className="requiredError">
              {loginformik.touched.email && loginformik.errors.email}
            </p>
          ) : null}
        </div>
        <br />
        <div className="inputBox">
          <input
            type="text"
            name="password"
            value={loginformik.values.password}
            onChange={loginformik.handleChange}
          />
          <span>Password</span>
          {loginformik.touched.password &&
          Boolean(loginformik.errors.password) ? (
            <p className="requiredError">
              {loginformik.touched.password && loginformik.errors.password}
            </p>
          ) : null}
        </div>
        <br />
        <div>
          <p className="forget" onClick={() => {setShow(true)}}>Forget password?</p>
        </div>
        <div className="d-flex flex-column gap-2">
        <div onClick={loginWithGoogle} className="loginWith"><span className="icons"><FcGoogle/></span>Login with Google</div>
        <div onClick={loginWithGithub} className="loginWith"><span className="icons">< BsGithub/></span> Login with Github</div>
        </div>
        <br />

        <button className="button" type="submit">
          Login
        </button>
        <br />
        
        <div>
          <p>Don't have an account? <Link to={"/Signup"} className="forget">Signup</Link></p>
        </div>
        
      </form>

     


      {/* // forget password modal */}
      <div>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Forget Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="">
                    Enter Email : <input type="email" value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} />
                </label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={forgetPassword}>
                    Send Email
                </Button>
            </Modal.Footer>
        </Modal>
        </div>



       
        
    </div>
  );
};

export default Login;
