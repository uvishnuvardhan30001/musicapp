import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import UserHome from './UserHome'
import UserPlayList from './UserPlayList'
import UserAlbums from './UserAlbums'
import Artists from './Artists'
import UserProfile from './UserProfile'
import './UserNavBar.css'
import PlaySong from './PlaySong'
import UpdateUserProfile from './UpdateUserProfile';
import ViewAlbum from './ViewAlbum';

export default function UserNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('User');

    navigate('/userlogin');
    window.location.reload()
  };
  return (
    <div className="wrapper">
    <div className="sidebar">
        <img className='row' src={logo} alt='logo' />
        <br/> <br/> <br/>
    <ul className='navbar'>
    <li><Link to="/userhome">Home</Link></li>
    <li><Link to="/userplaylist">Playlists</Link></li>
    <li><Link to="/useralbums">Albums</Link></li>
    <li><Link to="/artists">Artists</Link></li>
    <li><Link to="/userprofilecard">Profile</Link></li>
    <li><Link to="updateuser"></Link></li>
    <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
    <li><Link to="viewalbum"></Link></li>

    <li><Link to="playsong"></Link></li>

    </ul>
    </div>
    <Routes>
        <Route path="/userhome" Component={UserHome}/>
        <Route path="/userplaylist" Component={UserPlayList}/>
        <Route path="/useralbums" Component={UserAlbums}/>
        <Route path="/artists" Component={Artists}/>
        <Route path="/userprofilecard" element={<UserProfile/>}/>
        <Route path='/playsong' Component={PlaySong}/>
        <Route path='/updateuser' Component={UpdateUserProfile}/>
        <Route path="/viewalbum/:moviename" Component={ViewAlbum}/>
        <Route path="/playsong/:songname" Component={PlaySong}/>
    </Routes>

    </div>
  )
}
