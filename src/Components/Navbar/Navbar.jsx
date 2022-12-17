import React, { useEffect } from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import "./styles.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../server/redux/actions/user';
import { searchProd } from '../../server/services/product/product.service';

const Navbar = () => {
  const isUser = useSelector((state)=>state.user).isUser
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    console.log(isUser);
    // const listener = event => {
    //   if (event.code === "Enter" || event.code === "NumpadEnter") {
    //     console.log("Enter key was pressed. Run your function.");
    //     event.preventDefault();
    //     // callMyFunction();
    //     submit(event);
    //   }
    // };
    // document.addEventListener("keydown", listener);
    // return () => {
    //   document.removeEventListener("keydown", listener);
    // };
  }, [isUser]);
  const submit = (e)=>{
    e.preventDefault()
    console.log(e.target.search.value);
    if(e.target.search.value.length){
      navigate("/search?query="+e.target.search.value)
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">SPC SOAP</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <form className="d-flex mr-auto ml-auto" role="search" onSubmit={submit}>
              <div class="input-group-prepend">
                <span class="input-group-text"><SearchIcon/></span>
            </div>
            <input name="search" className="form-control me-2 border-0 search" type="search" placeholder="Search for products and more" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit" style={{display: "none"}}>Search</button>
      </form>
    
      <ul className="navbar-nav mb-2 mb-lg-0 ">
        {isUser&&<><li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/cart"><ShoppingCartOutlinedIcon/></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/"><FavoriteBorderOutlinedIcon/></Link>
        </li>
        <li className="nav-item">
          <button onClick={()=>{
            dispatch(signout(true))
            window.location.reload()
            }}>Logout</button>
        </li>
        </>}
        {!isUser&&<><li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link prim-btn" to="/signup">Sign Up</Link>
        </li></>}
      </ul>
      
    </div>
  </div>
</nav>

  )
}

export default Navbar