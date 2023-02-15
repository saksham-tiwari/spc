import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Spinner from "./Components/Spinner/Spinner";
import Router from "./routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./server/redux/actions/user";
import { loadCart } from "./server/redux/actions/cart";
import Footer from "./Components/Footer/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const loading = useSelector((state)=>state.loading).loading
  const dispatch = useDispatch()
  const isUser = useSelector((state)=>state.user).isUser||localStorage.getItem("token")
  const [scroll,setScroll] = useState()


  useEffect(()=>{
    // console.log(localStorage.getItem("token"));
    // console.log(loading);
      const body = document.getElementsByTagName("body")[0]
      body.style.overflow =  loading?"hidden":"visible"
      window.addEventListener("resize",()=>{
        setScroll(document.body.scrollHeight)
      })
      // console.log(body);
  },[loading])

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      dispatch(loadCart())
      dispatch(setUser(true))}
    else dispatch(setUser(false))

    // if(window.)
  },[isUser])
  const location = useLocation();
  useEffect(()=>{
    console.log(location);
    // const { offsetHeight: height } = document.getElementById('root');
    var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    const {innerHeight:heightSite} = window
    // const scroll = document.body.scrollHeight
    console.log("height:"+height+"\n heightSite:"+heightSite,document.body.scrollHeight);
    let footer = document.getElementsByTagName('footer')[0];
    if(height-150<=(heightSite)){
      if(!location.pathname.includes("cart")){
        footer.style.position="fixed"
        footer.style.bottom="0px"
        footer.style.width= "calc(100% - 13rem)";
      }
      console.log(true);

    } else{
      console.log(false);

      footer.style.position="relative"
      footer.style.width= "100%";

    }
  },[location,loading,scroll])
  useLayoutEffect(()=>{
    console.log("Layout Effect");
  },[window])
  
  return (
    <div>
      {loading && <Spinner />}
      <Navbar/>
      <Router/>
      <Footer/>
    </div>
  );
}

export default App;
