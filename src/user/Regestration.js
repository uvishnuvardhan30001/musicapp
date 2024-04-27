import React, { useState } from 'react'
import './UserHome.css'
import axios from 'axios';
import config from '../config';
export default function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateofbirth: '',
    contact: '',
    email: '',
    password: ''
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => // e stands foe event
  {
    
    setFormData({...formData, [e.target.id]: e.target.value});
    
    // It updates the state `formData` by adding or updating a property with a key equal to 
    //the ID of the input field 
    //that triggered the change event (e.target.id). The value of this property is 
    //set to the new value entered in that input field (e.target.value).
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/insertuser`, formData);
      if (response.status === 200) 
      {
        // It will set all fields to ""
        setFormData({
          name: '',
          gender: '',
          dateofbirth: '',
          contact: '',
          email: '',
          password: ''
        });
        


      }
      else if (response.status === 500)
      {
        setMessage("Error Found")
      }
     
      
      setMessage(response.data);
      setError(''); //set error to ""
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage(''); //set message to ""
    }
  };






  return (
    <div className="main_content">
    {/* <h2 class="header" > I am in About page</h2>   */}
    <div className="info">
      
    {/* 
    <h1 align="center">I am in Login page</h1> */}
    <h1 align="center">Signup Form</h1><br/><br/> 
    <div align="center">
    <div >
    {
        message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <br/>
            <div>
              <h4 align="left">Name</h4>
              <input type="text" id="name" value={formData.name} onChange={handleChange} required/>
            </div>
            <div>
          <h4 align="left">Gender</h4>
          <select  id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
            <div>
              <h4 align="left">Date of Birth</h4>
              <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required/>
            </div>
            <div>
              <h4 align="left">Mobile No</h4>
              <input type="text" id="contact" value={formData.contact} pattern="[6789][0-9]{9}" onChange={handleChange} required/>
            </div>
            <div>
              <h4 align="left">email</h4>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
          <h4 align="left">Password</h4>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required/>
        </div>
        {/* <div>
          <h4 align="left">Confirm Password</h4>
          <input type="password" id="confirmpassword" required/>
        </div> */}
            <button type="submit" className="loginbutton">Signup</button>
            <br/><br/>
            <h3>Already have an account? <a href='/userlogin'>Login</a></h3>
          </form>
    </div>
    
    </div>
    </div>
    
    </div>
  )
}
