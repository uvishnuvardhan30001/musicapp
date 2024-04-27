import React, { useEffect, useState } from 'react'
import './UserHome.css'
// import CreateAlbum from './AddAlbum'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import ViewAlbum from './ViewAlbum';
// import AddSongs from './AddSongs';

export default function AdminAlbums() {
  const navigate = useNavigate();
 const [events, setEvents] = useState([]);

 const fetchEvents = async () => {
   try {
     const response = await axios.get(`${config.url}/viewalbums`);
     setEvents(response.data);
   } catch (error) {
     console.error(error.message);
   }
 };

 useEffect(() => {
   fetchEvents();
 }, []);

 const handlesongs = async (moviename) => {
  try 
  {
    navigate(`/viewalbum/${moviename}`)
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
    {/* <Link to="/addalbum" className='abutton'>Create Album</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
    {/* <Link to="/addsongs" className='abutton'>Add Songs</Link> */}
    </div>
    
    {/* <Routes>
        <Route path="/createalbum" element={<CreateAlbum/>}/>
    </Routes> */}
    
      <h2 align="left">Albums</h2><br/>
      <table >

      <tbody>
        <tr>
          {events.length > 0 ? (
            events.map((event, index) => (
              <td key={index}>
               {

        
          <div className="card">
    <img src={`${config.url}/albumimage/${event.file}`} alt={event.name} width="50%" className='imgcd' />
 
        <h4>{event.name}</h4>
        <div align="center">
        <button onClick={() => handlesongs(event.name)} className='abutton'>View Album</button>&nbsp;&nbsp;&nbsp;

    </div>
    
    <Routes>
    <Route path="/viewalbum/:moviename" element={<ViewAlbum />} />
        {/* <Route path="/addsongs" element={<AddSongs/>}/> */}
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

  
