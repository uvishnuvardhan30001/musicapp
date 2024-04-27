import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';
import './Admin.css';

export default function PlaySong() {
    const { songname } = useParams();
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRefs = useRef([]);
    const [currentTimes, setCurrentTimes] = useState([]);
    const [durations, setDurations] = useState([]);

    useEffect(() => {
        const fetchSongData = async () => {
            try {
                const response = await axios.get(`${config.url}/playsong/${songname}`);
                setSongs(response.data);
                setCurrentTimes(response.data.map(() => 0));
                setDurations(response.data.map(() => 0));
                audioRefs.current = response.data.map(() => React.createRef());
            } catch (error) {
                console.error(error.message);
            }
        };

        if (songname) {
            fetchSongData();
        }
    }, [songname]);

    useEffect(() => {
        // Play the first song automatically when component mounts
        if (songs.length > 0) {
            
        }
    }, [songs]);

    const playAudio = (index) => {
        audioRefs.current[index].current.src = `${config.url}/songaudio/${songs[index].file}`;
        const playPromise = audioRefs.current[index].current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setCurrentSongIndex(index);
                    setIsPlaying(true);
                })
                .catch((error) => console.error('Autoplay was prevented:', error));
        }
    };

    const toggleAudio = (index) => {
        if (currentSongIndex === index) {
            if (isPlaying) {
                audioRefs.current[index].current.pause();
                setIsPlaying(false);
            } else {
                playAudio(index);
            }
        } else {
            if (currentSongIndex !== null && isPlaying) {
                audioRefs.current[currentSongIndex].current.pause();
            }
            playAudio(index);
        }
    };

    const updateTime = (index) => {
        setCurrentTimes((prevTimes) => {
            const newTimes = [...prevTimes];
            newTimes[index] = audioRefs.current[index].current.currentTime;
            return newTimes;
        });
    };

    const updateDuration = (index) => {
        setDurations((prevDurations) => {
            const newDurations = [...prevDurations];
            newDurations[index] = audioRefs.current[index].current.duration;
            return newDurations;
        });
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const nextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        toggleAudio(nextIndex);
    };

    const prevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        toggleAudio(prevIndex);
    };

    const forwardSong = () => {
        const newTime = currentTimes[currentSongIndex] + 5; // Forward 5 seconds
        audioRefs.current[currentSongIndex].current.currentTime = Math.min(newTime, durations[currentSongIndex]);
    };

    const backwardSong = () => {
        const newTime = currentTimes[currentSongIndex] - 5; // Backward 5 seconds
        audioRefs.current[currentSongIndex].current.currentTime = Math.max(newTime, 0);
    };

    return (
        <div className="main_content">
            <div className="info">
                <div>PlaySong</div>
                <div className="playlist" >
                    {songs.map((song, index) => (
<div align="center">
                        <div key={index} className='card2' >
                            <img src={`${config.url}/albumimage/${song.image}`} alt={song.songname} className="songImage" />
                            <audio
                                ref={audioRefs.current[index]}
                                onTimeUpdate={() => updateTime(index)}
                                onDurationChange={() => updateDuration(index)}
                                onEnded={nextSong}
                            />
                            <div className="title">{song.songname}</div>
                            <div className="songContainer">
                                <div className="songDetails">
                                    <div className="controls">
                                        <button className="controlButton" onClick={() => toggleAudio(index)}>
                                            {index === currentSongIndex && isPlaying ? "Pause" : "Play"}
                                        </button>
                                        <button className="controlButton" onClick={prevSong}>
                                            Previous
                                        </button>
                                        <button className="controlButton" onClick={nextSong}>
                                            Next
                                        </button>
                                        <button className="controlButton" onClick={backwardSong}>
                                            Backward 5s
                                        </button>
                                        <button className="controlButton" onClick={forwardSong}>
                                            Forward 5s
                                        </button>
                                    </div>
                                    <div className="timeBarContainer">
                                        <div className="timeBar">
                                            <div className="progressBar" style={{ width: `${(currentTimes[index] / durations[index]) * 100}%` }}></div>
                                        </div>
                                        <div className="timeDisplay">{formatTime(currentTimes[index])} / {formatTime(durations[index])}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
