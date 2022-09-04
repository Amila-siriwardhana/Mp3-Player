import Songs from "./components/Songs";
import Player from "./components/Player";
import "./styles/_app.scss";
import data from "./data";
import { useState, useRef } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const [songsData, setSongsData] = useState(data());
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    console.log(animation);

    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation });
  };

  return (
    <div className={`app ${libraryStatus ? "library-active" : " "}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Songs currentSong={currentSong} />
      <Player setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songsData={songsData} setSongsData={setSongsData} />
      <Library audioRef={audioRef} setCurrentSong={setCurrentSong} isPlaying={isPlaying} songsData={songsData} currentSong={currentSong} setSongsData={setSongsData} libraryStatus={libraryStatus} />
      <audio onLoadedMetadata={timeHandler} onTimeUpdate={timeHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
