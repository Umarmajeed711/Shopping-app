import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Nav";
import MyRoute from './components/Myroute';
import { Footer } from './components/Footer';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/Context';
import axios from 'axios';


const App = () => {


  // data store in a context api
  let {state , dispatch} = useContext(GlobalContext);


  // useEffect  check is the userTOken is available or not.
  useEffect(() => {

    // get the userToken from local storage
    let userToken = localStorage.getItem("userToken");

    // api for check the user authorization
    axios.get('https://dummyjson.com/auth/me' , { headers: { Authorization: `Bearer ${userToken}` }})
    .then((res) => {
      console.log(res.data)
      dispatch({type:"USER_LOGIN", payload: res.data})
    })
    .catch((err) => {
      userLogout();
      console.log(err)
    })
  }, [])


  // function for user logout 
  const userLogout = () => {
    localStorage.removeItem("userToken");
    dispatch({type: "USER_LOGOUT"})
  }
 
  return(
    <div>
      {
        (state.isLogin == true) ?  <NavBar /> : null
      }
      
      <MyRoute />

      {
        (state.isLogin == true) ?  <Footer/> : null
      }
      
      
    </div>
  )
}

export default App;