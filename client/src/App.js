import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.jsx";
import { GlobalProvider } from "./context/Provider.js";
import HomePage from "./screen/HomePage.jsx";
function App() {
  
  return (
    <GlobalProvider>
      <Navbar />
      <HomePage/>
    </GlobalProvider>
  );
}

export default App;
