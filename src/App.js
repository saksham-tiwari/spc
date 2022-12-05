import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Spinner from "./Components/Spinner/Spinner";
import Router from "./routes/Routes";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state)=>state.loading).loading

  useEffect(()=>{
    console.log(loading);
      const body = document.getElementsByTagName("body")[0]
      body.style.overflow =  loading?"hidden":"visible"
      console.log(body);
  },[loading])
  return (
    <div>
      {loading && <Spinner />}
      <Navbar/>
      <Router/>
    </div>
  );
}

export default App;
