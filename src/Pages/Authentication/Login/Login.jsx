import React from 'react'
import login from "../../../Assets/login.svg"
import "./Login.css"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
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
                            Welcome Back
                        </h1>
                    </div>
                    <div className='login-para'>
                        <p>
                            Please enter your email and password
                            <p style={{ textAlign: 'center' }}>to log in your account.</p>
                        </p>
                    </div>
                   
                    <form>
                        <div className='email mb-4'>
                            <label className='py-2'>Email</label>
                            <div className='email-icon'>
                                <EmailIcon />
                            </div>
                            <input  type="email" placeholder='xyz@akgec.ac.in' required />
                        </div>
                        <div className='password mb-4'>
                            <label className='py-2'>Password</label>
                            <div className='password-icon'>
                                <LockIcon />
                            </div>
                            <div className='eye-icon'>
                                <VisibilityOffIcon />
                            </div>
                            <input  type="password" placeholder='6+ Characters' required/>
                     
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

export default Login