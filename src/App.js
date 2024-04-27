import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import AdminNavBar from "./admin/AdminNavBar";
import MainNavBar from "./main/MainNavBar";
import UserNavBar from './user/UserNavBar';



export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const userLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsUserLoggedIn(userLoggedIn);

  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onUserLogin = () => {
    localStorage.setItem('isUserLoggedIn', 'true');
    setIsUserLoggedIn(true);
  };


  return (
    <div className="App">
      
      <BrowserRouter>
      {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isUserLoggedIn ? (
          <UserNavBar/>
        ) :  (
          <MainNavBar
          onAdminLogin={onAdminLogin}
          onUserLogin={onUserLogin}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

