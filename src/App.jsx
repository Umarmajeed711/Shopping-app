import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Nav";
import MyRoute from './components/Myroute';
import { Footer } from './components/Footer';

const App = () => {
  return(
    <div>
      <NavBar />
      <MyRoute />
      <Footer/>
    </div>
  )
}

export default App;