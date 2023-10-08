import React, { useEffect, useState } from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import "./styles.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../server/redux/actions/user';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Menu } from '@mui/icons-material';
import logo from "../../Assets/spclogo.svg"

const Navbar = () => {
  const isUser = useSelector((state)=>state.user).isUser
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state)=>state.cart)
  const [name,setName] = useState("")
  useEffect(() => {
    console.log(isUser);
    if(isUser) setName(JSON.parse(localStorage.getItem("user")).Name )
  }, [isUser]);
  const submit = (e)=>{
    e.preventDefault()
    console.log(e.target.search.value);
    if(e.target.search.value.length){
      navigate("/search?query="+e.target.search.value)
    }
  }
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  function closeSearch() {
    document.getElementsByClassName("searchRow")[0].classList.toggle("open");
  }
  return (
    <nav className='navibar d-flex justify-content-between align-items-center'>
      <div className='logo'>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="SPC Soap" className="mainLogo"/>
        </Link>
      </div>
      <form className="d-flex mr-auto ml-auto mySearch" role="search" onSubmit={submit}>
            <div class="input-group-prepend">
                <span class="input-group-text"><SearchIcon/></span>
            </div>
            <input name="search" className="form-control me-2 border-0 search" type="search" placeholder="Search for products and more" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul className='btns d-flex justify-content-end align-items-center web' style={{marginTop:"10px"}}>
        {isUser&&<><li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/cart"><ShoppingCartOutlinedIcon/>{cart.length?<span class='badge badge-warning' id='lblCartCount'> {cart.length} </span>:<></>}</Link>
        </li>
        
        <li className="nav-item">
            <DropdownButton id="dropdown-basic-button" title={`Hi!,${name.length>10?(`${name.substring(0,10)}...`):name}`}>
              
              <Dropdown.Item onClick={()=>navigate("/order-history")}><Inventory2OutlinedIcon/>My Orders</Dropdown.Item>
              <Dropdown.Item onClick={()=>navigate("/wishlist")}><FavoriteBorderOutlinedIcon/> Wishlist</Dropdown.Item>
              <Dropdown.Item onClick={()=>{
                dispatch(signout(true))
                window.location.reload()
                }}>
                <LogoutOutlinedIcon/>
                Logout</Dropdown.Item>
            </DropdownButton>
        </li>
        </>}
        {!isUser&&<><li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link prim-btn" to="/signup">Sign Up</Link>
        </li></>}
      </ul>

      <div className='btns d-flex justify-content-end align-items-center mobile'>
        <span className='searchBtn' style={{fontSize:"30px",cursor:"pointer"}} onClick={closeSearch}><SearchIcon fontSize='large'/></span>
        <span className='hamBtn' style={{fontSize:"30px",cursor:"pointer"}} onClick={openNav}><Menu fontSize='large'/> </span>
      </div>      

      <div id="mySidenav" className="sidenav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        {isUser?<>
            <h1>Hi, {name}</h1>
            <Link onClick={closeNav} to='/cart'><ShoppingCartOutlinedIcon fontSize='large'/> Cart</Link>
            <Link onClick={closeNav} to='/order-history'><Inventory2OutlinedIcon  fontSize='large'/> My Orders</Link>
            <Link onClick={()=>{
                    dispatch(signout(true))
                    window.location.reload()
                    closeNav()
                    }}>
                    <LogoutOutlinedIcon fontSize='large'/> Logout</Link>

        </>:<>
            <Link onClick={closeNav} to='/login'>Login</Link>
            <Link onClick={closeNav} to='/signup'>SignUp</Link>
        </>}
      </div>
      <div className='searchRow'>
        <form className="d-flex mr-auto ml-auto" role="search" onSubmit={submit}>
            <button onClick={closeSearch} className='close' type='button'>&times;</button>
            <div class="input-group-prepend">
                <span class="input-group-text"><SearchIcon/></span>
            </div>
            <input name="search" className="form-control me-2 border-0 search" type="search" placeholder="Search for products and more" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>

        </form>
      </div>
      
    </nav>

  )
}

export default Navbar