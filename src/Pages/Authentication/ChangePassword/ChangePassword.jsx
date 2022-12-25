import { Key } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { changePass } from '../../../server/services/auth/auth.service';
import { setLoading } from '../../../server/redux/actions/loading';
import { message } from 'antd';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUser } from '../../../server/redux/actions/user';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [isMobile,setIsMobile] = useState(false);


    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        mode: "onTouched"
    });
    let location = useLocation()

    useEffect(()=>{
        console.log(location);
        if(location.state===null) navigate("/login")
    },[location])

    const onSubmit = (data, e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        let formDataObj = {
            email : location.state.email,
            password : data.password,
        }
        console.log(formDataObj);
        changePass(formDataObj)
        .then((res) => {
            dispatch(setLoading(false));
            localStorage.setItem("user",JSON.stringify(res.data.user))
            localStorage.setItem("token",res.data.token)
            dispatch(setUser(true))
            // navigate("/otp", { state: { email: formDataObj.email } })
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
            <h1>Change Password</h1>
            {/* <p className='empText'>Please enter your email and password to log in your account.</p> */}
        </div>
        <form className={`d-flex mr-auto ml-auto flex-wrap ${styles.formLogin}`} onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-direction-column mb-4'>
                <label>
                    New Password
                </label>
                <div className='d-flex'>
                    <div class="input-group-prepend">
                        <span class="input-group-text"><Key/></span>
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

            <button className='prim-btn' type='submit'>Submit</button>


        </form>

    </div>
  )
}

export default ChangePassword