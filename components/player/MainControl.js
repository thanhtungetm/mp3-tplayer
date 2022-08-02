import cls from "classnames";
import styles from "../../scss/player/MainControl.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faShuffle,
  faForwardStep,
  faBackwardStep,
  faRepeat,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/dist/client/image";

export function MainControl() {
  const { state: { currentSong, isPlay, isLoading, volume}, songs , dispatch } = useContext(MusicPlayerContext);
  const audio = useRef(null);
  const durationBar = useRef(null);

  let readyState = null;

  const [updateSilerbar, setUpdateSilerbar] = useState(null)
  const [currentPercent, setCurrentPercent] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)
  // const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (isPlay) {
      console.warn("PLAY");
      audio.current.play();

      //If end back to start time
      if(audio.current.ended){
        audio.current.currentTime = 0
      }

      const id = setInterval(() => {
        const percent = audio.current.currentTime / audio.current.duration * 100
        setCurrentPercent(percent)
        setCurrentTime(audio.current.currentTime )
        if(audio.current.ended){
            dispatch({ type: "PAUSE" });
            audio.current.currentTime = 0
            setCurrentPercent(0)
            setCurrentTime(0)
        }
      }, 1000);
      setUpdateSilerbar(id)
    } else {
      console.warn("PAUSE");
      audio.current.pause();
      clearInterval(updateSilerbar)
    }
  }, [isPlay]);

  useEffect(() => {
    if (currentSong) {
      // audio.current.volume = 0.1;
      audio.current.src = currentSong ? currentSong.source : "";
      audio.current.onloadeddata = function (data) {
        dispatch({ type: "DISABLE_LOADING" });
      };
    }else{
      const song = songs[Math.floor(Math.random() * songs.length)]
      dispatch({type:'SET_SONG', song})
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      console.log(volume);
      audio.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!isLoading) {
      console.log(isLoading);
      if(!firstLoad){
        dispatch({ type: "PLAY" });
      }
      setFirstLoad(false)

      
    }
  }, [isLoading]);

  const togglePlay = () => {
    dispatch({ type: "TOGGLE" });
  };

  const changeSong = (type) => {
    console.log("Next")
    let currentIndex = songs.indexOf(currentSong)

    if(type==-1){     //Prev song
      currentIndex--
      if(currentIndex < 0){
        currentIndex = songs.length - 1
      }

    }else if(type==1){    //next song
      currentIndex++
      if(currentIndex >= songs.length){
        currentIndex = 0
      }
    }
    
    
    dispatch({ type:'PAUSE'})
    dispatch({ type:'SET_SONG', song: songs[currentIndex]})
    dispatch({ type:'SET_LOADING'})

  }
  const changeCurrentime = (e) => {
    const clientX = e.clientX
    const durationX = durationBar.current.getBoundingClientRect().x
    const durationWidth = durationBar.current.getBoundingClientRect().width
    const lenght = clientX - durationX
    const percent = lenght / durationWidth
    audio.current.currentTime = percent * audio.current.duration
    setCurrentTime(audio.current.currentTime)
    console.log(lenght, percent * audio.current.duration )
  }

  // console.log("State", state)
  return (
    <div className={cls(styles.mainControl)}>
      <div className={cls(styles.controlBtn)}>
        <div className={cls(styles.btnWrapper)}>
          <FontAwesomeIcon icon={faShuffle} />
        </div>
        <div className={cls(styles.btnWrapper)} onClick={()=>changeSong(-1)}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </div>
        {!isLoading && (
          <div
            className={cls({
              [styles.playBtn]: true,
              [styles.pauseBtn]: isPlay,
            })}
            onClick={togglePlay}
          >
            {isPlay ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon style={{ paddingLeft: "3px" }} icon={faPlay} />
            )}
          </div>
        )}
        {isLoading && (
          <div
            className={cls({
              [styles.playBtn]: true,
              [styles.pauseBtn]: isPlay,
            })}
            onClick={togglePlay}
          >
            <Image src="/images/loading.gif" width={30} height={30} />
          </div>
        )}
        <div className={cls(styles.btnWrapper)} onClick={()=>changeSong(1)}>
          <FontAwesomeIcon icon={faForwardStep} />
        </div>
        <div className={cls(styles.btnWrapper)}>
          <FontAwesomeIcon icon={faRepeat} />
        </div>
      </div>
      <div className={cls(styles.durationBar)}>
        <span>{String(Math.floor(currentTime/60)).padStart(2, '0')} : {String(Math.floor(currentTime%60)).padStart(2, '0')}</span>
        <div ref={durationBar} className={cls(styles.sliderVolumeBase)}  onMouseDown={changeCurrentime}>
          <div className={cls(styles.sliderBar)}>
            <div style={{width: `${currentPercent}%`}} className={cls(styles.sliderVolume)}>
              <span></span>
            </div>
          </div>
        </div>

        <span>{currentSong ? currentSong.time : '00:00'}</span>
      </div>
      <audio ref={audio} src='/mp3'></audio>
    </div>
  );
}
