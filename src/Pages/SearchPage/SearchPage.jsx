import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Card2 from '../../Components/Cards/Card2/Card2'
import { setLoading } from '../../server/redux/actions/loading'
import { searchProd } from '../../server/services/product/product.service'
import styles from "./styles.module.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import empty from "../../Assets/empty.svg"


const SearchPage = () => {
    const location = useLocation()
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [explore,setExplore] = useState(true)
    useEffect(()=>{
        dispatch(setLoading(true))
        let query = location.search.split("=")[1]
        console.log(query,location);
        if(location.search==='') setExplore(true)
        else setExplore(false)
        searchProd(location.search!==''?query:'')
        .then((res)=>{
            console.log(res.data);
            setData(res.data)
            dispatch(setLoading(false))
            // if(res.data.length)
        })
        .catch((err)=>{
            dispatch(setLoading(false))
            console.log(err)
        })
        },[location])
        
  return (
    <div className={styles.page}>
        <div className={styles.fixed}>
        <h2>
        <ArrowBackIcon onClick={()=>navigate("/")} fontSize='large'/>
        {explore?("Explore all products"):(data.length + "search results found")}
        {/* {data.length} search results found */}
        </h2>
        <div className={styles.filterBlock}>
            <h3>Filters</h3>
            <div>
                <h4>Availability</h4>
                <label className='empText'>
                    <input type="checkbox" />
                    &ensp;In Stock
                </label>
                <label className='empText'>
                    <input type="checkbox" />
                    &ensp;Out of stock
                </label>
            </div>
        </div>

        </div>
        <div className={styles.prodsBlock}>

        {data.length===0 && <div className={styles.empty}>
        <h1>No such product</h1>
        <p>Kindly try using some other keywords.</p>
        <button className='prim-btn' onClick={()=>{navigate("/explore")}}>Explore all items</button>
        <div>
        <img src={empty} alt="emptyCart"></img>
        </div>
      </div>}

        {data.map(prod=><Card2 product={prod}/>)}
        </div>
    </div>
  )
}

export default SearchPage