import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Spinner from "./Components/Spinner/Spinner";
import Router from "./routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./server/redux/actions/user";
import { loadCart } from "./server/redux/actions/cart";

function App() {
  const loading = useSelector((state)=>state.loading).loading
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log(localStorage.getItem("token"));
    console.log(loading);
      const body = document.getElementsByTagName("body")[0]
      body.style.overflow =  loading?"hidden":"visible"
      console.log(body);
  },[loading])

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      dispatch(loadCart())
      dispatch(setUser(true))}
    else dispatch(setUser(false))
  },[])
  return (
    <div>
      {loading && <Spinner />}
      <Navbar/>
      <Router/>
    </div>
  );
}

export default App;
