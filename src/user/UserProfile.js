import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './UserHome.css'

export default function UserProfile() {
    const [UserData, setUserData] = useState(null);
  
    useEffect(() => {
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    }, []);
  
    return (
        UserData ? (
            
            <div className="main_content">
            <div className="info"><br/><br/><br/><br/><br/>
                <div className='profile-card'>
          <p><strong>Full Name:</strong> {UserData.name}</p>
          <p><strong>Gender:</strong> {UserData.gender}</p>
          <p><strong>Date of Birth:</strong> {UserData.dateofbirth}</p>
          <p><strong>Email:</strong> {UserData.email}</p>
          <p><strong>Contact:</strong> {UserData.contact}</p>
          <Link to='/updateuser'>
          <button className='home'>Update</button>
          </Link>
          {/* <button >Update Details<a href='/updateuser'>.</a></button> */}
          </div>
          </div>
          </div>
        
      ) : (
        <p>No User Data Found</p>
        
     
      )
     
    );
   
  }