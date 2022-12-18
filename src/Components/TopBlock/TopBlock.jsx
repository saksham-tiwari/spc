import React from 'react'
import styles from "./styles.module.css"
import img from "../../Assets/topblock.svg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const TopBlock = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.topblock} style={{background:`url(${img})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <div className={styles.textDiv}>
            <h1>One stop shop for natural and herbal soaps</h1>
            <button className='prim-btn' onClick={()=>navigate("/explore")}>Buy Products <ArrowForwardIcon/></button>
        </div>
    </div>
  )
}

export default TopBlock