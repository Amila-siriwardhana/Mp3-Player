import React from "react";

const LibrarySongs = ({ currentSong, audioRef, song, setCurrentSong, isPlaying, songsData, id, setSongsData }) => {
  const songSelectHandler = () => {
    const selectedSong = songsData.filter((state) => state.id === id);
    setCurrentSong(selectedSong[0]);

    if (isPlaying) audioRef.current.play();
    const newSong = songsData.map((song) => {
      if (song.id === id) {
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

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySongs;
