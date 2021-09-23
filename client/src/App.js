import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import HomePage from "./screen/HomePage.jsx";
import ShoppingCart from "./screen/ShoppingCart.jsx";

function App() {
  
  return (
   <div>
      <Navbar />
     <BrowserRouter>
     <Route path='/' exact component={HomePage}/>
     <Route path='/cart' exact component={ShoppingCart} />
     </BrowserRouter>
     
      
    </div>
  );
}

export default App;
