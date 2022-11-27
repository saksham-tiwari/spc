import React, { useEffect } from 'react'
import img from "../../../Assets/login.svg"
import "./Otp.css"
import KeyIcon from '@mui/icons-material/Key';
import { otp } from '../../../server/services/auth/auth.service';
import { useLocation, useNavigate } from 'react-router-dom';

const Otp = (props) => {
    let location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(location);
        if(location.state===null) navigate("/signup")
    },[location])
    const submit = (e)=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));
        console.log(formDataObj);
        otp(location.state.email,formDataObj.otp)
        .then((res)=>{
            console.log(res);
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            props.setUser(true)
            // navigate("/")
        })
        .catch((err)=>{console.log(err);})
    }
    return (<>
        <div className='Page-content'>
            <div className='left-side'>
                <div className='login-image-pos'>
                    <img id='login-image' src={img} alt='login' />
                </div>
            </div>
            <div className='right-side'>
                <div className='form'>
                    <div className='login-heading'>
                        <h1>
                            Verify Account
                        </h1>
                    </div>
                    <div className='login-para'>
                        <p>
                            Please enter your Otp
                            <p style={{ textAlign: 'center' }}>to verify your account.</p>
                        </p>
                    </div>
                   
                    <form onSubmit={submit}>
                        <div className='email mb-4'>
                            <label className='py-2'>OTP</label>
                            <div className='email-icon'>
                                <KeyIcon />
                            </div>
                            <input name="otp" type="number" placeholder='****' required />
                        </div>
                        <div className='login-btn mb-3 py-2'>
                            <button className='login-button' type='submit'>Log in</button>
                        </div>
                    </form>
                    <div className='forgot-password-text'>
                        <p>Forgot password?</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Otp