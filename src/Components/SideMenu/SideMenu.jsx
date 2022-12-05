import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./styles.module.css"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
    <h1> <Link to="/"><ArrowBackIcon fontSize='large'/></Link>
    My Orders
    </h1>
    <div>
        <ul>
            <li><Link to="/"><FavoriteBorderOutlinedIcon/> Wishlist</Link></li>
            <li><Link to="/"><Inventory2OutlinedIcon/> My Orders</Link></li>
            <li><Link to="/"><LogoutOutlinedIcon/> Logout</Link></li>
        </ul>
    </div>
    </div>
  )
}

export default SideMenu