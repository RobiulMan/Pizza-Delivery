import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import HomePage from "./screen/HomePage.jsx";
import Login from "./screen/LoginScreen";
import OrderScreen from "./screen/OrderScreen";
import Registation from "./screen/RegisterScreen";
import ShoppingCart from "./screen/ShoppingCart.jsx";

function App() {

  return (
   <div>
      
     <BrowserRouter>
     <Navbar />
     <Route path='/' exact component={HomePage}/>
     <Route path='/cart' exact component={ShoppingCart} />
     <Route path='/login' exact component={Login}/>
     <Route path='/registation' exact component={Registation}/>
     <Route path='/order' exact  component={OrderScreen}/>
     </BrowserRouter>
     
      
    </div>
  );
}

export default App;
