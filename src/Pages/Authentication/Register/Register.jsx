import React, { useEffect, useState } from 'react'
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
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';

const Register = () => {
    const navigate = useNavigate();

    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        mode: "onTouched"
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        setLoading(true);
        let formDataObj = {
            email : data.email,
            Name : data.Name,
            phoneNumber : data.phoneNumber,
            password : data.password,
        }
        console.log(formDataObj);
        signup(formDataObj)
        .then((res) => {
            setLoading(false);
            navigate("/otp", { state: { email: formDataObj.email } })
            console.log(res);
        })
        .catch((err) => { console.log(err);
            setLoading(false); })
        reset();
    }

    return (<>
        {
            loading ? <Spinner /> : null
        }
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
                            Please enter your details <br />
                            to create your account in 1 go.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='email mb-1'>
                            <label className='py-2'>Email</label>
                            <div className='email-icon'>
                                <EmailIcon />
                            </div>
                            <input type="email" placeholder='xyz@akgec.ac.in' name="email" {...register("email", { required: "email is required", pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{4,}[@][a][k][g][e][c][\.][a][c][\.][i][n]$/i, message: "this is not a valid email" } })} />
                            <p className='alerts'>{errors.email?.message}</p>
                        </div>
                        <div className='email mb-1'>
                            <label className='py-2'>Name</label>
                            <div className='email-icon'>
                                <PersonIcon />
                            </div>
                            <input name="Name" type="text" placeholder='Name' {...register("Name", { required: "name is required", pattern: { value: /^[a-zA-Z]{1,}$/i, message: "this is not a valid name" } })} />
                            <p className='alerts'>{errors.Name?.message}</p>
                        </div>
                        <div className='email mb-1'>
                            <label className='py-2'>Phone Number</label>
                            <div className='email-icon'>
                                <PhoneIcon />
                            </div>
                            <input type="number" placeholder='9956118028' name="phoneNumber" {...register("phoneNumber", { required: "phone number is required", pattern: { value: /^[6789]\d{9}$/i, message: "this is not a valid phone number" } })} />
                            <p className='alerts'>{errors.phoneNumber?.message}</p>
                        </div>
                        <div className='password mb-1'>
                            <label className='py-2'>New Password</label>
                            <div className='password-icon'>
                                <LockIcon />
                            </div>

                            {
                                toggle ? <div className='eye-icon' onClick={() => { setToggle(!toggle) }}>
                                    <VisibilityIcon />
                                </div> : <div className='eye-icon' onClick={() => { setToggle(!toggle) }}>
                                    <VisibilityOffIcon />
                                </div> 
                            }

                            <input type={toggle ? "text" : "password"} placeholder='7+ Characters' name="password" {...register("password", { required: "password is required", minLength: { value: 8, message: "password must be more than 8 characters" }, maxLength: { value: 14, message: "password cannot exceed more than 14 characters" } })} />
                            <p className='alerts'>{errors.password?.message}</p>

                        </div>
                        <div className='password mb-1'>
                            <label className='py-2'>Confirm Password</label>
                            <div className='password-icon'>
                                <LockIcon />
                            </div>
                            {
                                toggle2 ? <div className='eye-icon' onClick={() => { setToggle(!toggle) }}>
                                <VisibilityIcon />
                            </div> : <div className='eye-icon' onClick={() => { setToggle(!toggle) }}>
                                <VisibilityOffIcon />
                            </div> 
                            }
                            <input
                            name='confirm_password'
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
                             <p className='alerts'>{errors.confirm_password?.message}</p>
                        </div>
                        <div className='login-btn mb-3 py-2'>
                            <button className='login-button' type='submit'>Sign in</button>
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

export default Register