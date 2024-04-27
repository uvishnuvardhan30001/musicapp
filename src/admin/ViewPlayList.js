import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PlaySong from './PlaySong';

export default function ViewPlayList() {
  const [albumData, setAlbumData] = useState([]);
  const [albimg, setAlbimg] = useState(null);
  const [songDurations, setSongDurations] = useState({});
  // const [currentSongIndex, setCurrentSongIndex] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const { moviename } = useParams();

  useEffect(() => {
    const fetchSongsData = async () => {
      try {
        const response = await axios.get(`${config.url}/viewsongs/${moviename}`);
        setAlbumData(response.data);
        if (response.data.length > 0) {
          setAlbimg(response.data[0]);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (moviename) {
      fetchSongsData();
    }
  }, [moviename]);

  useEffect(() => {
    const fetchSongDurations = async () => {
      // const durations = {};
      for (const song of albumData) {
        try {
          const audio = new Audio(`${config.url}/songaudio/${song.file}`);
          await audio.load();
          audio.onloadedmetadata = () => {
            setSongDurations(currentDurations => ({
              ...currentDurations,
              [song.file]: audio.duration
            }));
          };
        } catch (error) {
          console.error(`Error fetching duration for ${song.file}: ${error.message}`);
          setSongDurations(currentDurations => ({
            ...currentDurations,
            [song.file]: 0
          }));
        }
      }
    };

    if (albumData.length > 0) {
      fetchSongDurations();
    }
  }, [albumData]);

  function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  

  const handlePlayButtonClick = async (songname) => {
    try 
    {
      navigate(`/playsong/${songname}`)
      // window.location.reload()
    } 
    catch (error) 
    {
      console.error(error.message);
    }
  }

  function handleFavoriteButtonClick(song) {
    console.log(`Adding ${song.songname} to favorites`);
  }
  return (
    <div className="main_content">
      <div className="info">
        {albimg && <img className='play' src={`${config.url}/albumimage/${albimg.image}`} alt={albimg} />}
        <table id="playsong">
          <thead>
            <tr>
              <th>Sno</th>
              <th></th>
              <th>Song Name</th>
              <th>Artist</th>
              <th>Play time</th>
              <th>Date Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {albumData.length > 0 ? (
              albumData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <button className="abutton" onClick={() => handlePlayButtonClick(data.songname)} >play
                    </button>
                    
                  </td>
                  <td>{data.songname}</td>
                  <td>{data.singers}</td>
                  <td>{formatDuration(songDurations[data.file])}</td>
                  <td>{data.date}</td>
                  <td><button className="button1" onClick={() => handleFavoriteButtonClick(data)}>
                      <FontAwesomeIcon icon={faHeart} />
                    </button></td>
                    
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align="center">No Songs found</td>
              </tr>
            )}
          </tbody>
        </table>
        <Routes>
    <Route path="/playsong/:songname" element={<PlaySong />} />
    </Routes>
      </div>
    </div>
  );
}