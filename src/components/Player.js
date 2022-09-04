import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ setSongInfo, songInfo, audioRef, currentSong, isPlaying, setIsPlaying, songsData, setCurrentSong, setSongsData }) => {
  const activeLibraryHandler = (preNext) => {
    const newSong = songsData.map((song) => {
      if (song.id === preNext.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongsData(newSong);
  };

  const getTime = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  };

  const timeUpdateHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    if (direction === "skip-forward") {
      const currentSongIndex = songsData.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songsData[(currentSongIndex + 1) % songsData.length]);
      activeLibraryHandler(songsData[(currentSongIndex + 1) % songsData.length]);
    }
    if (direction === "skip-backward") {
      const currentSongIndex = songsData.findIndex((song) => song.id === currentSong.id);
      if ((currentSongIndex - 1) % songsData.length === -1) {
        await setCurrentSong(songsData[songsData.length - 1]);
        activeLibraryHandler(songsData[songsData.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }

      setCurrentSong(songsData[(currentSongIndex - 1) % songsData.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-controller">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right,${currentSong.color[0]}, ${currentSong.color[1]} ) ` }} className="track">
          <input value={songInfo.currentTime} min={0} max={songInfo.duration} onChange={dragHandler} type="range" />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : 0.0}</p>
      </div>

      <div className="player-controller">
        <FontAwesomeIcon icon={faAngleLeft} onClick={() => skipTrackHandler("skip-backward")} />
        <FontAwesomeIcon onClick={timeUpdateHandler} icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon icon={faAngleRight} onClick={() => skipTrackHandler("skip-forward")} />
      </div>
    </div>
  );
};

export default Player;
