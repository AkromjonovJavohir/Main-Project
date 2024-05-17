import React, { useState } from 'react'
import logo from '../../assets/img/logo.png'
import user from '../../assets/img/Illustration.png';
import { Link } from 'react-router-dom';
import bell from '../../assets/img/bell.png'
import cog from '../../assets/img/cog.png'
import search from '../../assets/svg/search.svg'
import curved from '../../assets/img/curved6.jpeg'
import userimg from '../../assets/svg/user-circle.svg'

export default function Login() {
  const [open, setOpen] = useState(false)
  return (
    <div className='login'>
      <div className="login-navbar">
        <h1 className="login-navbar-logo">
          Soft UI Dashboard
        </h1>
        <ul className="login-navbar-menu">
          <li className="login-navbar-link"><img src={bell} alt="" /><a href="#">Dashboard</a></li>
          <li className="login-navbar-link"><img src={cog} alt="" /><a href="#">Profile</a></li>
          <li className="login-navbar-link"><img src={userimg} alt="" /><a href="#">Sign In</a></li>
        </ul>
        <button className='login-navbar-button'>FREE DOWNLOAD</button>
      </div>
      <div className='login-body'>
        <div className="login-col">
          <div className="login-col-header">
            <h1 className='login-col-title'>Sign In</h1>
            <p className='login-col-description'>Enter your email and password to sign in</p>
          </div>
          <div className="login-col-inputs">
            <div className='login-input-row'>
              <div className='login-label'>Email Address</div>
              <input type="text" className="login-input" placeholder='youremail@gmail.com' />
            </div>
            <div className='login-input-row'>
              <div className='login-label'>Password</div>
              <div className="input-row">
                <input className="login-input" type={open ? "text" : "password"} placeholder='password' />
                {
                  open ? <i class="bi bi-eye-fill" onClick={() => setOpen(false)}></i> : <i class="bi bi-eye-slash" onClick={() => setOpen(true)}></i>
                }
              </div>
            </div>
          </div>
          <button className='login-col-btn'>Sign In</button>
        </div>
      </div>
    </div>

  )
}
