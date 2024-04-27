import React from 'react'
import {Routes,Route,Link, useNavigate} from 'react-router-dom'
import logo from '../images/logo.png'
import AdminHome from './AdminHome'
import AdminPlayList from './AdminPlayList'
import AdminAlbum from './AdminAlbums'
import AdminArtist from './AdminArtist'
import UsersData from './UsersData'
import './AdminNavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompactDisc, faMusic, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import AddAlbum from './AddAlbum'
import AddSongs from './AddSongs'
import ViewAlbum from './ViewAlbum'
import PlaySong from './PlaySong'
import CreatePlayList from './CreatePlayLists'
import ViewPlayList from './ViewPlayList'

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload()
  };

  return (
    <div className="wrapper">
    <div className="sidebar">
        <img className='row' src={logo} alt='logo' />
        <br/> <br/> <br/>
    <ul className='navbar'>
    <li><Link to="/"><FontAwesomeIcon icon={faHome} /> Home</Link></li>
    <li><Link to="/adminplaylist"><FontAwesomeIcon icon={faMusic} /> Playlists</Link></li>
    <li><Link to="/adminalbums"><FontAwesomeIcon icon={faCompactDisc} /> Albums</Link></li>
    <li><Link to="/adminartists"><FontAwesomeIcon icon={faUser} /> Artists</Link></li>
    <li><Link to="/usersdata"><FontAwesomeIcon icon={faUsers} /> Users</Link></li>
    <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
    <li><Link to="/addalbum"></Link></li>
    <li><Link to="/addsongs"></Link></li>
    <li><Link to="/viewalbum"></Link></li>
    <li><Link to="/playsong"></Link></li>
    <li><Link to="/createplaylist"></Link></li>


    
    </ul>
    </div>
    <Routes>
        <Route path="/" Component={AdminHome}/>
        <Route path="/adminplaylist" Component={AdminPlayList}/>
        <Route path="/adminalbums" Component={AdminAlbum}/>
        <Route path="/adminartists" Component={AdminArtist}/>
        <Route path="/usersdata" element={<UsersData/>}/>
        <Route path="/addalbum" Component={AddAlbum}/>
        <Route path="/addsongs" Component={AddSongs}/>
        <Route path="/viewalbum/:moviename" Component={ViewAlbum}/>
        <Route path="/playsong/:songname" Component={PlaySong}/>
        <Route path="/createplaylist" Component={CreatePlayList}/>
        <Route path="/viewplaylist/:playlistname" Component={ViewPlayList}/>





    </Routes>

    </div>
  )
}
