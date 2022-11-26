import React from 'react'
import login from "../../../Assets/login.svg"
import "./Register.css"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { signup } from '../../../server/services/auth/auth.service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const submit = (e)=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));
        console.log(formDataObj);
        signup(formDataObj)
        .then((res)=>{
            navigate("/otp",{state:{email:formDataObj.email}})
            console.log(res);
        })
        .catch((err)=>{console.log(err);})
    }
    return (<>
        <div className='Page-content'>
            <div className='left-side'>
                <div className='login-image-pos'>
                    <img id='login-image' src={login} alt='login' />
                </div>
            </div>
            <div className='right-side'>
                <div className='form'>
                    <div className='login-heading'>
                        <h1>
                            Register
                        </h1>
                    </div>
                    <div className='login-para'>
                        <p style={{ textAlign: 'center' }}>
                            Please enter your details <br/>
                            to create your account in 1 go.
                        </p>
                    </div>
                   
                    <form onSubmit={submit}>
                        <div className='email mb-4'>
                            <label className='py-2'>Email</label>
                            <div className='email-icon'>
                                <EmailIcon />
                            </div>
                            <input name="email" type="email" placeholder='xyz@akgec.ac.in' required />
                        </div>
                        <div className='email mb-4'>
                            <label className='py-2'>Name</label>
                            <div className='email-icon'>
                                <PersonIcon />
                            </div>
                            <input name="Name" type="text" placeholder='Name' required />
                        </div>
                        <div className='email mb-4'>
                            <label className='py-2'>Phone Number</label>
                            <div className='email-icon'>
                                <PhoneIcon />
                            </div>
                            <input name="phoneNumber" type="number" placeholder='9997788654' required />
                        </div>
                        <div className='password mb-4'>
                            <label className='py-2'>New Password</label>
                            <div className='password-icon'>
                                <LockIcon />
                            </div>
                            <div className='eye-icon'>
                                <VisibilityOffIcon />
                            </div>
                            <input name="password" type="password" placeholder='6+ Characters' required/>
                     
                        </div>
                        <div className='password mb-4'>
                            <label className='py-2'>Confirm Password</label>
                            <div className='password-icon'>
                                <LockIcon />
                            </div>
                            <div className='eye-icon'>
                                <VisibilityOffIcon />
                            </div>
                            <input  type="password" placeholder='6+ Characters' required/>
                     
                        </div>
                        <div className='login-btn mb-3 py-2'>
                            <button className='login-button' type='submit'>Sign in</button>
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

export default Register