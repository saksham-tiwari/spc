import { useEffect, useState } from "react";
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
  const footerFix = useSelector((state)=>state.footer).fix
  const [isMobile,setIsMobile] = useState(false);

  // const [scroll,setScroll] = useState()

  const location = useLocation()


  useEffect(()=>{
    // console.log(localStorage.getItem("token"));
    // console.log(loading);
      const body = document.getElementsByTagName("body")[0]
      body.style.overflow =  loading?"hidden":"visible"
  },[loading])
  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  useEffect(()=>{
    if(localStorage.getItem("token")) {
      dispatch(loadCart())
      dispatch(setUser(true))}
    else dispatch(setUser(false))

    // if(window.)
  },[isUser])
  useEffect(() => {
    if(window.outerWidth<=768){
      setIsMobile(true)
    }
    else setIsMobile(false)
  }, []); 

  //function to keep check of mobile screen
  window.addEventListener("resize",()=>{
    if(window.outerWidth<=768){
        setIsMobile(true)
    }
    else setIsMobile(false)
  })
  // const location = useLocation();
  useEffect(()=>{
    let footer = document.getElementsByTagName('footer')[0];
    if(footerFix){
      footer.style.position="fixed"
      footer.style.bottom="0px"
      footer.style.width= !isMobile?"calc(100% - 13rem)":"calc(100% - 3.34rem)";
      console.log(true);
    } else{
      console.log(false);
      footer.style.position="relative"
      footer.style.width= "100%";
    }
  },[footerFix,isMobile])
  
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
