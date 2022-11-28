import axios from "axios"
import { logout } from "../auth/auth.service";
import {BaseUrl} from "../BaseUrl";
import accessHeader from "../Header";

axios.defaults.baseURL = BaseUrl;
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (401 === error.response.status) logout()
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const getWishlist = async ()=>{
    return await axios.get("/user/wishlist",accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const getCart = async ()=>{
    return await axios.get("/user/cart",accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const addToWishlist = async (wishlist)=>{
    return await axios.post("/user/wishlist",{wishlist},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const addToCart = async (cart,dec=false)=>{
    return await axios.post("/user/cart?dec="+dec,{cart},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const removeFromWishlist = async (wishlist)=>{
    return await axios.delete("/user/wishlist",{wishlist},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const removeFromCart = async (cart)=>{
    return await axios.delete("/user/cart",{cart},accessHeader())
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}