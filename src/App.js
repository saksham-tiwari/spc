import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Spinner from "./Components/Spinner/Spinner";
import Router from "./routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./server/redux/actions/user";

function App() {
  const loading = useSelector((state)=>state.loading).loading
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token")) dispatch(setUser(true))
    else dispatch(setUser(false))
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
