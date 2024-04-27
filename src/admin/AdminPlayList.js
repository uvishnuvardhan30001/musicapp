import React, { useEffect, useState } from 'react'
import './Admin.css'
import CreateAlbum from './AddAlbum'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import ViewAlbum from './ViewAlbum';
import AddSongs from './AddSongs';
import CreatePlayList from './CreatePlayLists';
import ViewPlayList from './ViewPlayList';

export default function AdminPlaylist() {
  const navigate = useNavigate();
 const [events, setEvents] = useState([]);

 const fetchEvents = async () => {
   try {
     const response = await axios.get(`${config.url}/viewplaylists`);
     setEvents(response.data);
   } catch (error) {
     console.error(error.message);
   }
 };

 useEffect(() => {
   fetchEvents();
 }, []);

 const handlesongs = async (playlistname) => {
  try 
  {
    navigate(`/viewplaylists/${playlistname}`)
    // window.location.reload()
  } 
  catch (error) 
  {
    console.error(error.message);
  }
}


  return (
  <div className="main_content">
  {/* <h2 class="header" > I am in View Users page</h2>   */}
  <div className="info">
    <div align="right">
    <Link to="/createplaylist" className='abutton'>Create PlayList</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Link to="/addsongs" className='abutton'>Add Songs</Link>
    </div>
    
    <Routes>
        <Route path="/createplaylist" element={<CreatePlayList/>}/>
    </Routes>
    
      <h2 align="left">Play Lists</h2><br/>
      <table >

      <tbody>
        <tr>
          {events.length > 0 ? (
            events.map((event, index) => (
              <td key={index}>
               {

        
          <div className="card">
    <img src={`${config.url}/playlistimage/${event.file}`} alt={event.name} width="50%" className='imgcd' />
 
        <h4>{event.name}</h4>
        <div align="center">
        <button onClick={() => handlesongs(event.name)} className='abutton'>View PlayList</button>&nbsp;&nbsp;&nbsp;

    </div>
    
    <Routes>
    <Route path="/viewplaylist/:playlistname" element={<ViewPlayList />} />
        <Route path="/addsongs" element={<AddSongs/>}/>
    </Routes>
        </div>
} 
              </td>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No Albums found</td>
            </tr>
          )}
          </tr>
        </tbody>
        </table>
        </div>
    </div>
    
  )
}

  
