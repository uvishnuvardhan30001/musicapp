import React, { useState } from 'react';
import './user.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';


export default function AdminLogin({onAdminLogin}) 
{
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/checkadminlogin`, formData);
      if (response.data!=null) 
      {
        onAdminLogin()

        localStorage.setItem('admin',JSON.stringify(response.data));

        navigate("/adminhome");
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };

  return (
    <div className="main_content">
    {/* <h2 class="header" > I am in About page</h2>   */}
    <div className="info">
      
    <div>
      <h3 align="center"><u>Admin Login</u></h3><br/><br/>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>
      }
      <div  align="center">
      <form onSubmit={handleSubmit}>
        <div>
          <h4 align="left">Username</h4>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <h4 align="left">Password</h4>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="adminbutton">Login</button>
      </form>
      </div>
    </div>
    </div>
    </div>
  );
}