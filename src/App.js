import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login/Login";
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <Navbar/>
      <Home />
      {/* <Login /> */}
    </div>
  );
}

export default App;
