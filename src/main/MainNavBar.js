import React from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import Home from './Home'
import About from './About'
import UserLogin from '../user/UserLogin'
import AdminLogin from '../admin/AdminLogin'
import Regestration from '../user/Regestration'
import Contact from './Contact'
import logo from '../images/logo.png'
import './MainNavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faSignInAlt, faUserPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons';





export default function MainNavBar({onAdminLogin,onUserLogin}) {
  return (
    
    <div className="wrapper">
    <div className="sidebar">
        <img className='row' src={logo} alt='logo' />
        <br/> <br/> <br/>
    <ul className='navbar'>
    <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
    <li><Link to="/about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link></li>
    <li><Link to="/userlogin"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
    <li><Link to="/regestration"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</Link></li>
    <li><Link to="/adminlogin"><FontAwesomeIcon icon={faSignInAlt} /> Admin Login</Link></li>
    <li><Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /> Contact Us</Link></li>
    </ul>
    </div>
    <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/about" Component={About}/>
        <Route path="/userlogin" element={<UserLogin onUserLogin={onUserLogin}/>}exact/>
        <Route path="/regestration" element={<Regestration/>}exact />
        <Route path="/adminlogin"element={<AdminLogin onAdminLogin={onAdminLogin}/>}exact />
        <Route path="/contact" element={<Contact/>}/>
    </Routes>
    


    </div>
  )
}
