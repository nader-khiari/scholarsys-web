import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

// Import Logo
import Logo from '../../assets/img/logo-white.png';

// import service
import authService from '../../services/auth.service';

import toast, { Toaster } from 'react-hot-toast';


function ForgotPassword() {

    const [email, setEmail] = useState("")
    const history = useHistory()

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const recoverPassword = (e) => {
        e.preventDefault()
        authService.forgotPassword(email)
        toast.success("Success. Please Check your e-mail to reset your password")
        setTimeout(() => {
            history.push('/login')
        }, 6000);
    }

    return (
        <div className="main-wrapper login-body">
            <Toaster position="top-right"
                reverseOrder={false} />
            <div className="login-wrapper">
                <div className="container">
                    <div className="loginbox">
                        <div className="login-left">
                            <img className="img-fluid" src={Logo} alt="Logo" />
                        </div>

                        <div className="login-right">
                            <div className="login-right-wrap">
                                <h1>Forgot Password?</h1>
                                <p className="account-subtitle">Enter your email to get a password reset link</p>

                                <form action="login.html">
                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="Email" value={email} onChange={handleEmailChange} required />
                                    </div>
                                    <div className="form-group mb-0">
                                        <button className="btn btn-primary btn-block" onClick={recoverPassword}>Reset Password</button>
                                    </div>
                                </form>

                                <div className="text-center dont-have">Remember your password? <button onClick={() => history.push('/login')}>Login</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   </div>
    )
}

export default ForgotPassword