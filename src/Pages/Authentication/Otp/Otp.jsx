import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux';
import { otp, resendOtp } from '../../../server/services/auth/auth.service';
import { setLoading } from '../../../server/redux/actions/loading';
import { setUser } from '../../../server/redux/actions/user';
import { message } from 'antd';
import LockIcon from '@mui/icons-material/Lock';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';

import "./Otp.css"

const Otp = () => {
    let location = useLocation()
    const [isMobile,setIsMobile] = useState(false);
    const [resen,setResen] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log(location);
        if(location.state===null) navigate("/signup")
    },[location])

    useEffect(()=>{
        setTimeout(()=>{
            setResen(true)
        },60000)
    },[])
    const submit = (e)=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));
        console.log(formDataObj);
        dispatch(setLoading(true))
        otp(location.state.email,formDataObj.otp)
        .then((res)=>{
            console.log(res);

            if(location.state.type==="forgot"){
                navigate("/change-password",{ state: { email: location.state.email } })
            }
            else{
                localStorage.setItem("user",JSON.stringify(res.data.user))
                localStorage.setItem("token",res.data.token)
                dispatch(setUser(true))
            }
            dispatch(setLoading(false))
            // props.setUser(true)
            // navigate("/")
        })
        .catch((err)=>{
            if(err.response.status===404) message.error("Incorrect OTP")
            dispatch(setLoading(false))
            console.log(err);})
}

const resend = ()=>{
    resendOtp({email:location.state.email})
    .then((res)=>{
        message.success("Otp Resent!")
        console.log(res);
        setResen(false)
        setTimeout(()=>{setResen(true)},60000)
    })
    .catch((err)=>{
        message.error("Otp cannot be resent!")
        console.log(err)
    })
}
useEffect(() => {
    if(window.outerWidth<=768){
      setIsMobile(true)
    }
    else setIsMobile(false)
  }, []); 

  //function to keep check of mobile screen
  window.addEventListener("resize",()=>{
    if(window.outerWidth<=768){
        setIsMobile(true)
    }
    else setIsMobile(false)
  })
  return (
    <div className={styles.loginBox}>
        <div className={styles.head}>
            <h1>Check your email</h1>
            <p className='empText'>We sent a verification code to your email. Enter the code to proceed.</p>
        </div>
        <form className={`d-flex mr-auto ml-auto flex-wrap ${styles.formLogin}`}onSubmit={submit}>
            
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    Verification Code
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><KeyIcon/></span>
                    </div>
                   
                    <input className="form-control me-2 border-0" name="otp" type="number" placeholder='****' required />
                    
                </div>
                    {/* <p className='alerts'>{errors.password?.message}</p> */}
                    <br/>
                <div className={styles.forgo}><button disabled={!resen} onClick={resend} className={styles.forgot}>Resend Otp</button></div>

            </div> 

            <button className='prim-btn' type='submit'>Submit</button>


        </form>

    </div>
  )
}

export default Otp