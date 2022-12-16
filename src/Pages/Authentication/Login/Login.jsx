import React, { useEffect, useState } from 'react'
import img from "../../../Assets/login.svg"
import "./Login.css"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { login } from '../../../server/services/auth/auth.service';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";  
import { setLoading } from '../../../server/redux/actions/loading';


const Login = (props) => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
        dispatch(setLoading(true))

        login(data)
            .then((res) => {
                console.log(res);
                dispatch(setLoading(false))
                localStorage.setItem("user", JSON.stringify(res.data))
                localStorage.setItem("token", res.data.token)
                props.setUser(true)
            })
            .catch((err) => { console.log(err);
                dispatch(setLoading(false))
            })
                reset();
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
                        Welcome Back
                    </h1>
                </div>
                <div className='login-para'>
                    <p>
                        Please enter your email and password
                        <p style={{ textAlign: 'center' }}>to log in your account.</p>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='email mb-1'>
                        <label className='py-2 le'>Email</label>
                        <div className='email-icon'>
                            <EmailIcon />
                        </div>
                        <input type="email" placeholder='xyz@akgec.ac.in' name="email" {...register("email", { required: "email is required", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i, message: "this is not a valid email" } })} />
                        <p className='alerts'>{errors.email?.message}</p>
                    </div>
                    
                    <div className='password mb-1'>
                        <label className='py-2 lp'>Password</label>
                        <div className='password-icon'>
                            <LockIcon />
                        </div>
                        {
                            toggle ? <div className='eye-icon' onClick={() => { setToggle(!toggle) }}>
                                <VisibilityOffIcon />
                            </div> : <div className='eye-icon' onClick={() => { setToggle(!toggle) }}>
                                <VisibilityIcon />
                            </div>
                        }

                        <input type={toggle ? "text" : "password"} placeholder='7+ Characters' name="password" {...register("password", { required: "password is required", minLength: { value: 8, message: "password must be more than 8 characters" }, maxLength: { value: 14, message: "password cannot exceed more than 14 characters" } })} />
                        <p className='alerts'>{errors.password?.message}</p>
                    </div>
                    
                    <div className='login-btn mb-3 py-2'>
                        <button className='login-button' type='submit'>Log in</button>
                    </div>
                </form>
                <div className='forgot-password-text'>
                    <Link to={"/forgot"} className='Linker' ><p>Forgot password?</p></Link>
                </div>
            </div>
        </div>
    </div>
</>)
}
export default Login