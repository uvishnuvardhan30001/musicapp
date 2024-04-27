import React, { useState,useRef, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function AddSongs() {

    const [events, setEvents] = useState([]);
    // const [fetchimg, setFetchimg] = useState([]);

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${config.url}/viewalbums`);
        setEvents(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    // const fetchImages = async () => {
    //   const album=document.getElementById("moviename").value
    //     try {
    //       const response = await axios.get(`${config.url}/fetchimg/${album}`);
    //       setFetchimg(response.data);
    //     } catch (error) {
    //       console.error(error.message);
    //     }
    //   };
   
    useEffect(() => {
      fetchEvents();
    }, []);

  const [formData, setFormData] = useState({
    moviename: '',
    songname: '',
    singers: '',
    image:'',
    file: null
  });
 
  const fileInputRef = useRef(null); // Ref for the file input element

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('moviename', formData.moviename);
      formDataToSend.append('songname', formData.songname);
      formDataToSend.append('singers', formData.singers);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('file', formData.file); // Append the file object

      const response = await axios.post(`${config.url}/addsong`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for FormData
        }
      });

      if (response.status === 200) {
        setFormData({
            moviename: '',
            songname: '',
            singers: '',
            image:'',
            file: null
        });
        fileInputRef.current.value = '';
        document.getElementById('moviename').value = ''; // Reset to default value
        document.getElementById('image').value = ''; 
      }
      setMessage(response.data);
      setError('');
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage('');
    }
    
  };

  const [searchTerm] = useState('');

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const filteredEvents = events.filter((event) =>
  //   event.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const sortedEvents = events.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="main_content">
    {/* <h2 class="header" > I am in View Users page</h2>   */}
    <div className="info">
    
    <div>
      <h3 align="center"><u>Add Song</u></h3><br/>
      <div align="center">
      {message ? <h4 align="center">{message}</h4> : null}
      
      {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Movie Name</label>
          
          <select id="moviename"   onChange={handleChange} required>
          <option value="">---Select---</option>
  {sortedEvents.length > 0 ? (
          sortedEvents
            .filter((event) =>
              event.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((event, index) => (
      <option key={index}  value={event.name} >{event.name}</option>
    ))
  ) : (
    <option>No Albums Found</option>
  )}
</select>
        </div>
        <div>
          <label>Song name</label>
          <input type="text" id="songname" value={formData.songname} onChange={handleChange} required />
        </div>
        <div>
          <label>Singer(s)</label>
          <input type="text" id="singers" value={formData.singers} onChange={handleChange} required />
        </div>
        <div>
          <label>Image</label>
          <select id="image"   onChange={handleChange} required>
          <option value="">---Select---</option>
  {sortedEvents.length > 0 ? (
          sortedEvents
            .filter((event) =>
              event.file.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((event, index) => (
      <option key={index}  value={event.file} >{event.file}</option>
    ))
  ) : (
    <option>No Images Found</option>
  )}
</select>
         
        </div>
        <div>
          <label>Song</label>
          <input type="file"  id="file" ref={fileInputRef} onChange={handleFileChange} required />
        </div>
        <button type="submit">Add Song</button>
      </form>
      </div>
    </div>
    </div>
    </div>
  );
}