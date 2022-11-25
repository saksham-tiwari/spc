import axios from "axios"
import {BaseUrl} from "../BaseUrl";

axios.defaults.baseURL = BaseUrl;

export const getAllProducts = async ()=>{
    return await axios.get("/product/list")
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}