import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import DescBlock from '../../Components/DescBlock/DescBlock';
import ProdDetails from '../../Components/ProdDetails/ProdDetails';
import ProdDisplay from '../../Components/ProdDisplay/ProdDisplay';
import { setLoading } from '../../server/redux/actions/loading';
import { getProdById } from '../../server/services/product/product.service';
import styles from "./styles.module.css"

const ProductPage = () => {
    const location = useLocation();
    const [isMobile,setIsMobile] = useState(false);

    const [data,setData] = useState({
        "_id": "637fb18384e31878f1f16f00",
        "name": "Neem Soa",
        "category": "Soap",
        "quantity": 100,
        "price": 60,
        "imageUrl": ["/public/abd"],
        "eachrating": [],
        "__v": 0
    });
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setLoading(true))
        console.log(location.pathname.split("/")[2]);
        getProdById(location.pathname.split("/")[2])
        .then((res)=>{
            console.log(res);
            setData(res.data)
            dispatch(setLoading(false))
        })
        .catch((err)=>{
            dispatch(setLoading(false))
            console.log(err)})
    },[location])

    useEffect(() => {
        if(window.outerWidth<=876){
          setIsMobile(true)
        }
        else setIsMobile(false)
      }, []); 
  
      //function to keep check of mobile screen
      window.addEventListener("resize",()=>{
        if(window.outerWidth<=876){
            setIsMobile(true)
        }
        else setIsMobile(false)
      })
  return (
    <div>
        <p className={styles.toptext}>Products / {data.name} </p>
        {!isMobile&&<ProdDetails data={data}/>}
        <ProdDisplay data={data}/>
        {isMobile&&<ProdDetails data={data}/>}
        <DescBlock data={data}/>
    </div>
  )
}

export default ProductPage