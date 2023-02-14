import { Email } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signup } from '../../../server/services/auth/auth.service';
import { setLoading } from '../../../server/redux/actions/loading';
import { message } from 'antd';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [isMobile,setIsMobile] = useState(false);


    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        mode: "onTouched"
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        let formDataObj = {
            email : data.email,
            Name : data.Name,
            phoneNumber : data.phoneNumber,
            password : data.password,
        }
        console.log(formDataObj);
        signup(formDataObj)
        .then((res) => {
            dispatch(setLoading(false));
            navigate("/otp", { state: { email: formDataObj.email } })
            console.log(res);
        })
        .catch((err) => { 
            if(err.response.status===406) message.error("Account with given email already exists!")
            console.log(err);
            dispatch(setLoading(false)); })
        reset();
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
            <h1>Create an Account</h1>
            {/* <p className='empText'>Please enter your email and password to log in your account.</p> */}
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
                    <input className="form-control me-2 border-0" type="email" placeholder='xyz@akgec.ac.in' name="email" {...register("email", { required: "email is required", pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{4,}[@][a][k][g][e][c][\.][a][c][\.][i][n]$/i, message: "this is not a valid email" } })} />

                </div>
                    <p className='alerts'>{errors.email?.message}</p>
            </div> 
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    Name
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><PersonIcon/></span>
                    </div>
                    <input className="form-control me-2 border-0" name="Name" type="text" placeholder='Name' {...register("Name", { required: "name is required", pattern: { value: /^[a-zA-Z]+([\s][a-zA-Z]+)*$/i, message: "this is not a valid name" } })} />

                </div>
                    <p className='alerts'>{errors.Name?.message}</p>
            </div> 
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    Phone
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><PhoneIcon/></span>
                    </div>
                    <input className="form-control me-2 border-0" type="number" placeholder='eg: 9956118028,...' name="phoneNumber" {...register("phoneNumber", { required: "phone number is required", pattern: { value: /^[6789]\d{9}$/i, message: "this is not a valid phone number" } })} />

                </div>
                    <p className='alerts'>{errors.phoneNumber?.message}</p>
            </div> 
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    New Password
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
            </div> 

            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    Confirm Password
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><LockIcon/></span>
                    </div>
                   
                    <input
                            name='confirm_password'
                            className="form-control me-2 border-0"
                            type={toggle2 ? "text" : "password"} placeholder='7+ Characters'
                                {...register("confirm_password", {
                                    required: true,
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Your passwords do no match";
                                        }
                                    },
                                })}
                            />                    
                    {
                            toggle2 ? <span className={styles.eye} onClick={() => { setToggle2(!toggle2) }}>
                                <VisibilityOffIcon />
                            </span> : <span className={styles.eye} onClick={() => { setToggle2(!toggle2) }}>
                                <VisibilityIcon />
                            </span>
                        }
                    
                </div>
                <p className='alerts'>{errors.confirm_password?.message}</p>
                <br/>
            </div> 

            <button className='prim-btn' type='submit'>Sign Up</button>


        </form>

        <div className={styles.dont}>
            Already have an account ?
            <Link to="/login">Log In</Link>
        </div>
    </div>
  )
}

export default Register