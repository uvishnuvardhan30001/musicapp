import React, { useState,useRef } from 'react';
import axios from 'axios';
import config from '../config'

export default function CreateAlbum() {
  const [formData, setFormData] = useState({
    name: '',
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('file', formData.file); // Append the file object

      const response = await axios.post(`${config.url}/createalbum`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for FormData
        }
      });

      if (response.status === 200) {
        setFormData({
          name: '',
          file: null
        });
        fileInputRef.current.value = '';
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

  return (
    <div className="main_content">
    {/* <h2 class="header" > I am in View Users page</h2>   */}
    <div className="info">
    <div>
      <h3 align="center"><u>Add Album</u></h3>
      {message ? <h4 align="center">{message}</h4> : null}
      {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Movie Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Image</label>
          <input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} required />
        </div>
        <button type="submit" className='abutton'>Create</button>
      </form>
    </div>
    </div>
    </div>
  );
}