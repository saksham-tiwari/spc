import axios from "axios"
import {BaseUrl} from "../BaseUrl";

axios.defaults.baseURL = BaseUrl;

export const getWishlist = async ()=>{
    return await axios.get("/user/wishlist")
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const getCart = async ()=>{
    return await axios.get("/user/cart")
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const addToWishlist = async (wishlist)=>{
    return await axios.post("/user/wishlist",{wishlist})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const addToCart = async (cart)=>{
    return await axios.post("/user/cart",{cart})
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}