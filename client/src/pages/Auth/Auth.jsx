import React, { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Auth.css';
import icon from '../../assets/icon.png';
import Aboutauth from './Aboutauth';
import {signup,login} from '../../action/auth'
import { GoogleLogin } from '@react-oauth/google';
import { setcurrentuser } from '../../action/currentuser';
import { SendOtp, verifyOtp } from '../../action/login';


function Auth() {
    const [issignup, setissignup] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [otp,setOtp] = useState("");
    const [showOtpInput,setShowOtpInput] = useState(false)
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (/Mobi|Android|iPhone/i.test(userAgent)) {
            const currentHour = new Date().getHours();
            if (currentHour < 10 || currentHour >= 13) {
                alert("Mobile login allowed only between 10 AM - 1 PM");
            }
        }
    }, []);

        const detectBrowser = () => {
        const userAgent = navigator.userAgent;
        if (/Chrome/.test(userAgent) && !/Edge/.test(userAgent)) return "Chrome";
        if (/Edg/.test(userAgent)) return "Edge";
        return "Other";
    };


    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!email && !password) {
            alert("Enter Email and Password");
            return;
        }
        if (issignup) {
            if (!name) {
                alert("Enter a name to continue");
                return;
            }
            dispatch(signup({ name, email, password }, navigate));
            return;
        }
        const browser = detectBrowser();
        if (browser === "Chrome") {
            try {
                dispatch(SendOtp(email));
                setShowOtpInput(true);
            } catch (error) {
                console.error("Error sending OTP", error);
            }
            return;
        } else if (browser === "Edge") {
            dispatch(login({ email, password }, navigate));
        } else {
            alert("Invalid login attempt");
        }
    };

    const handleOtpSubmit = async () => {
        try {
            console.log("Entered OTP:", otp);
    
            // ✅ Make sure to pass `{ email, otp }`
            const response = await dispatch(verifyOtp(email, otp ));
    
            if (response.payload.success) {  // ✅ Access `.payload.success`
                console.log("✅ OTP Verified! Logging in...");
                dispatch(login({ email, password }, navigate)); 
            } else {
                alert("❌ Invalid OTP");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };
    
    
const handleswitch = ()=>{
    setissignup(!issignup);
    setname("");
    setemail("");
    setpassword("");
}
// google parser
const handleLoginSuccess = (response) => {
    const credential = response.credential;
    const userInfo = parseJwt(credential);
    localStorage.setItem("Profile",JSON.stringify(userInfo));
    dispatch(setcurrentuser(userInfo));
    navigate("/")
    // console.log("User Info:", userInfo);
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  };


    return (
        <section className="auth-section">
            {issignup && <Aboutauth />}
            <div className="auth-container-2">
                <img src={icon} alt="icon" className='login-logo' />


                <GoogleLogin
                    // onSuccess={credentialResponse => {
                    //     // console.log(credentialResponse);
                    //     localStorage("google-user",credentialResponse);
                    //     navigate("/")
                    // }}
                    onSuccess={handleLoginSuccess}

                    onError={() => {
                        console.log('Login Failed');
                    }}
                />




                <form onSubmit={handlesubmit}>
                
                    {issignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" id='name' name='name' value={name} onChange={(e) => {
                                setname(e.target.value);
                            }} />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="text" id='email' email='email' value={email} onChange={(e) => {
                            setemail(e.target.value);
                        }} />
                    </label>
                    <label htmlFor="password">
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <h4>Password</h4>
                            {issignup && (
                                <p style={{color:'#007ac6',fontSize:'13px'}}>
                                    Forgot Password?
                                </p>
                            )}
                        </div>
                        <input type="password" name='password' id='password' value={password} onChange={(e)=>{
                            setpassword(e.target.value)
                        }} />
                    </label>
                    {showOtpInput && !issignup && (
                        <label htmlFor="otp">
                            <h4>Enter OTP</h4>
                            <input type="text" id='otp' name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
                            <button type="button" onClick={handleOtpSubmit} className='auth-btn'>Verify OTP</button>
                        </label>
                    )}
                    {!showOtpInput && <button type='submit' className='auth-btn'>{issignup ? "Sign up" : "Log in"}</button>}
                </form>
                <p>
                    {issignup?"Already have an account":"Don't have an account"}
                    <button type='button' className='handle-switch-btn' onClick={handleswitch}>
                        {issignup?"Log in":"Sign up"}
                    </button>
                </p>
            </div>
        </section>

    )
}

export default Auth