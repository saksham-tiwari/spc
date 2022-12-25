import { Email } from '@mui/icons-material'
import React, { useState } from 'react'
import styles from "./styles.module.css"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../server/services/auth/auth.service';
import { setLoading } from '../../../server/redux/actions/loading';
import { setUser } from '../../../server/redux/actions/user';
import { message } from 'antd';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [toggle, setToggle] = useState(false);
    const [isMobile,setIsMobile] = useState(false);

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
                dispatch(setUser(true))
                // props.setUser(true)
            })
            .catch((err) => { 
                if(err.response.status===401) message.error("Incorrect Password!")
                if(err.response.status===404) message.error("Invalid user! Create an account.")
                console.log(err);
                dispatch(setLoading(false))
            })
                reset();
    }
  return (
    <div className={styles.loginBox}>
        <div className={styles.head}>
            <h1>Welcome Back</h1>
            <p className='empText'>Please enter your email and password to log in your account.</p>
        </div>
        <form className={`d-flex mr-auto ml-auto flex-wrap ${styles.formLogin}`} onSubmit={handleSubmit(onSubmit)}>
            
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    Email
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><Email/></span>
                    </div>
                    <input className="form-control me-2 border-0" type="email" placeholder='xyz@akgec.ac.in' name="email" {...register("email", { required: "email is required", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i, message: "this is not a valid email" } })} />

                </div>
                    <p className='alerts'>{errors.email?.message}</p>
            </div> 
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    Password
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><LockIcon/></span>
                    </div>
                   
                    <input className="form-control me-2 border-0" type={toggle ? "text" : "password"} placeholder='7+ Characters' name="password" {...register("password", { required: "password is required", minLength: { value: 8, message: "password must be more than 8 characters" }, maxLength: { value: 14, message: "password cannot exceed more than 14 characters" } })} />
                    
                    {
                            toggle ? <span className={styles.eye} onClick={() => { setToggle(!toggle) }}>
                                <VisibilityOffIcon />
                            </span> : <span className={styles.eye} onClick={() => { setToggle(!toggle) }}>
                                <VisibilityIcon />
                            </span>
                        }
                    
                </div>
                    <p className='alerts'>{errors.password?.message}</p>
                    <br/>
                <div className={styles.forgot}>Forgot Password?</div>
            </div> 

            <button className='prim-btn' type='submit'>Log in</button>


        </form>

        <div className={styles.dont}>
            Don’t have an account ?
            <Link to="/signup">Create an account</Link>
        </div>
    </div>
  )
}

export default Login