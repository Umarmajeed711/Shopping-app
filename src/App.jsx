import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Nav";
import MyRoute from './components/Myroute';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/Context';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router';
import { Like } from './components/Like';


const App = () => {


 // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK5LUUvbhxbAuk-kAZn0MnqQLm9ppUhzo",
  authDomain: "social-app-73175.firebaseapp.com",
  projectId: "social-app-73175",
  storageBucket: "social-app-73175.firebasestorage.app",
  messagingSenderId: "487635305748",
  appId: "1:487635305748:web:371fe8e161acc572c6ae01"
};

const app = initializeApp(firebaseConfig);

 


  const auth = getAuth();
  // useEffect  check is the userTOken is available or not.

   // data store in a context api
   let {state , dispatch} = useContext(GlobalContext);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user" , user);
        dispatch({type: "USER_LOGIN", payload: user})
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        dispatch({type: "USER_LOGOUT"})
        console.log("User Not Found")
        // User is signed out
        // ...
      }
    });
  }, [])


  // function for user logout 
  const userLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful")
    }).catch((error) => {
      // An error happened.
      console.log("An error happened")
    });
  }
 
  return(
    <div>
      
         {/* <nav>
        <ul className='d-flex column-gap-5 '>
       { (state.isLogin == true) ?
         <>
          <li><Link to={"/home"}   className='link'>Home</Link></li>
          <button   className='logout' onClick={userLogout} >Logout</button>
          </>
          :
          <>
          <li><Link to={"/signup"}   className='link'>Signup</Link></li>
          <li><Link to={"/Login"}   className='link'>login</Link></li>
          </>
       }
        </ul>
      </nav>  
       */}
       {
        (state?.isLogin) ?
        <>
         
         <NavBar /> 
         <Like />
        

         </>
         : null
       }
       
      
      <MyRoute />

  
      
      
    </div>
  )
}

export default App;