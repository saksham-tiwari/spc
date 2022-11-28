import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DescBlock from '../../Components/DescBlock/DescBlock';
import ProdDetails from '../../Components/ProdDetails/ProdDetails';
import ProdDisplay from '../../Components/ProdDisplay/ProdDisplay';
import { getProdById } from '../../server/services/product/product.service';
import styles from "./styles.module.css"

const ProductPage = () => {
    const location = useLocation();
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
    useEffect(()=>{
        console.log(location.pathname.split("/")[2]);
        getProdById(location.pathname.split("/")[2])
        .then((res)=>{
            console.log(res);
            setData(res.data)})
        .catch((err)=>console.log(err))
    },[location])
  return (
    <div>
        <p className={styles.toptext}>Products / Alovera Soap with Mogra fragnance </p>
        <ProdDetails data={data}/>
        <ProdDisplay data={data}/>
        <DescBlock/>
    </div>
  )
}

export default ProductPage