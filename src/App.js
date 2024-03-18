import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Room from "./components/Room";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilesreen from "./screens/Profilesreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import Resetpassword from "./screens/Resetpassword";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact Component={Homescreen} />
          {/* <Route path="/room" exact Component={Room} /> */}
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            Component={Bookingscreen}
          />
          <Route path="/register" exact Component={Registerscreen} />
          <Route path="/login" exact Component={Loginscreen} />
          <Route path="/profile" exact Component={Profilesreen} />
          <Route path="/admin" exact Component={Adminscreen} />
          <Route path="/" exact Component={Landingscreen} />
          <Route path="/resetpassword" exact Component={Resetpassword} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
