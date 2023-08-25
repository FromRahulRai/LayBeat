import "./App.css";
import { useRef, useState } from "react";
function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Vision",
    songArtist: "Bella",
    songSrc: "./Assets/Songs/0.mp3",
    songAvatar: "Assets/Images/Vision-bella.jpg",
  });

  // useState Variables

  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0)
  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  };

  // Change Avatar Class

  let avtarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avtarClassIndex, setAvtarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avtarClassIndex >= avtarClass.length - 1) {
      setAvtarClassIndex(0);
    } else {
      setAvtarClassIndex(avtarClassIndex + 1);
    }
  };

  // Play Audio Function

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };

  const musicAPI = [
    {
      songName: "Vision",
      songArtist: "Bella",
      songSrc: "./Assets/Songs/0.mp3",
      songAvatar: "Assets/Images/Vision-bella.jpg",
    },
    {
      songName: "52 Bars",
      songArtist: "Karan Aujla",
      songSrc: "./Assets/Songs/3.mp3",
      songAvatar: "Assets/Images/52.jpg",
    },
    {
      songName: "Sinner",
      songArtist: "King",
      songSrc: "./Assets/Songs/1.mp3",
      songAvatar: "Assets/Images/sinner.jpg",
    },
    {
      songName: "Everybody Hurts",
      songArtist: "Sidhu Moosewala",
      songSrc: "./Assets/Songs/2.mp3",
      songAvatar: "Assets/Images/Everybody.jpg",
    },
    {
      songName: "Your Eye",
      songArtist: "Talwinder",
      songSrc: "./Assets/Songs/4.mp3",
      songAvatar: "Assets/Images/talwinder.jpg",
    },
  ];

  // Function To handle Next Song

  const handleNextSong = () => {
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  };


    // Function To handle Previous Song

    const handlePrevSong = ()=>{
      if (musicIndex === 0) {
        let setNumber = musicAPI.length - 1;
        setMusicIndex(setNumber);
        updateCurrentMusicDetails(setNumber);
      }else{
        let setNumber = musicIndex - 1;
        setMusicIndex(setNumber)
        updateCurrentMusicDetails(setNumber);
      }
    }
  

  // Update Details 
  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar,
    });
    setIsAudioPlaying(true);
  };

  const handleAudioUpdate = ()=>{
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }

const videoArr = ["./Assets/Videos/video2.mp4","./Assets/Videos/video3.mp4","./Assets/Videos/video4.mp4","./Assets/Videos/video5.mp4","./Assets/Videos/video1.mp4"]


const handleChangeBackground = ()=>{
  if (videoIndex >= videoArr.length - 1) {
    setVideoIndex(0);
  }else{
    setVideoIndex(videoIndex + 1)
  }
}
  return (
    <>
      <div className="container">
        <audio src="./Assets/Songs/0.mp3" ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
        <video
          src={videoArr[videoIndex]}
          autoPlay
          muted
          loop
          className="backgroundVideo"
        ></video>

        <div className="blackScreen"></div>

        <div className="music-Container">
          <p className="musicPlayer">Lay Beat</p>
          <p className="music-Head-Name">{currentMusicDetails.songName}</p>
          <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
          <img
            src={currentMusicDetails.songAvatar}
            className={avtarClass[avtarClassIndex]}
            onClick={handleAvatar}
            alt="Song 52"
            id="song52"
          />
          <div className="musicTimerDiv">
            <p className="musicCurrentTime">{musicCurrentTime}</p>
            <p className="musicTotalLength">{musicTotalLength}</p>
          </div>
          <input
            type="range"
            name="musicProgressBar"
            className="musicProgressBar"
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <div className="musicControllers">
            <i className="fa-solid fa-backward musicControler"  onClick={handlePrevSong}></i>
            <i
              className={`fa-solid ${
                isAudioPlaying ? "fa-pause-circle" : "fa-circle-play"
              } playBtn`}
              onClick={handleAudioPlay}
            ></i>
            <i
              className="fa-solid fa-forward musicControler"
              onClick={handleNextSong}
            ></i>
          </div>
        </div>
        <div className="changeBackBtn" onClick={handleChangeBackground}>Change Background</div>
      </div>
    </>
  );
}

export default App;
