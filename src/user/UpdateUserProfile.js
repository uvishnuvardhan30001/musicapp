import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserHome.css';
import config from '../config';

export default function UpdateUserProfile() {
    const [userData, setUserData] = useState({
        name: '',
        gender: '',
        dateofbirth: '',
        contact: '',
        email: '',
        password: ''
    });
  
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [initialUserData, setInitialUserData] = useState({});
  
    useEffect(() => {
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setInitialUserData(parsedUserData); // Store initial job seeker data
      }
    }, []);
  
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => 
    {
      e.preventDefault();
      try 
      {
        const updatedData = {};
        for (const key in userData) {
          if (userData[key] !== initialUserData[key] && initialUserData[key] !== '') {
            updatedData[key] = userData[key]; 
          }
        }
        if (Object.keys(updatedData).length !== 0) {
          // There are changes
          updatedData.email = userData.email;
          const response = await axios.put(`${config.url}/updateuserprofile`, updatedData);
          setMessage(response.data);
          setError('');
          const res = await axios.get(`${config.url}/${userData.email}`, updatedData)
          localStorage.setItem("user",JSON.stringify(res.data))
        } else {
          // No changes
          setMessage("No Changes in User Profile");
          setError("");
        }
      } 
      catch (error) {
        setError(error.response.data);
        setMessage('');
      }
    };
    
    
    return (
        <div className="main_content">
        <div className="info">
        <h3 align="center"><u>Update Profile</u></h3>
        {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input type="text" id="name" value={userData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Gender</label>
            <input type="text" id="gender" value={userData.gender} readOnly />
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="date" id="dateofbirth" value={userData.dateofbirth} onChange={handleChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" id="email" value={userData.email} readOnly />
          </div>
          <div>
            <label>Password</label>
            <input type="password" id="password" value={userData.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Contact</label>
            <input type="number" id="contact" value={userData.contact} onChange={handleChange} required />
          </div>
          <button type="submit" className='home'>Update</button>
        </form>
      </div>
      </div>
    );
  }