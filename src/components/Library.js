import React from "react";
import LibrarySongs from "./LibrarySongs";

const Library = ({ currentSong, audioRef, songsData, setCurrentSong, isPlaying, setSongsData, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : " "}`}>
      <h2 className="library-title">Library</h2>
      <div className="library-songs">
        {songsData.map((song) => (
          <LibrarySongs isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} song={song} songsData={songsData} id={song.id} key={song.id} audioRef={audioRef} setSongsData={setSongsData} />
        ))}
      </div>
    </div>
  );
};

export default Library;
