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
  const { state, dispatch } = useContext(MusicPlayerContext);
  const audio = useRef(null);
  const durationBar = useRef(null);

  let readyState = null;

  const [updateSilerbar, setUpdateSilerbar] = useState(null)
  const [currentPercent, setCurrentPercent] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (state.isPlay) {
      console.warn("PLAY");
      audio.current.play();

      // audio.current.currentTime = 260 
      if(audio.current.ended){
        audio.current.currentTime = 0
      }

      const id = setInterval(() => {
        const percent = audio.current.currentTime / audio.current.duration * 100
        setCurrentPercent(percent)
        setCurrentTime(audio.current.currentTime )
        setDuration(audio.current.duration)
        // console.log(audio.current.currentTime);
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
      // console.log(updateSilerbar)
      clearInterval(updateSilerbar)
      // console.log(updateSilerbar)
    }
  }, [state.isPlay]);

  useEffect(() => {
    if (state.currentSong) {
      audio.current.volume = 0.1;
      audio.current.src = state.currentSong ? state.currentSong.source : "";
      audio.current.onloadeddata = function (data) {
        dispatch({ type: "DISABLE_LOADING" });
      };
    }
  }, [state.currentSong]);

  useEffect(() => {
    if (!state.isLoading) {
      console.log(state.isLoading);
      dispatch({ type: "PLAY" });
    }
  }, [state.isLoading]);

  const togglePlay = () => {
    dispatch({ type: "TOGGLE" });
  };

  // console.log("State", state)
  return (
    <div className={cls(styles.mainControl)}>
      <div className={cls(styles.controlBtn)}>
        <div className={cls(styles.btnWrapper)}>
          <FontAwesomeIcon icon={faShuffle} />
        </div>
        <div className={cls(styles.btnWrapper)}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </div>
        {!state.isLoading && (
          <div
            className={cls({
              [styles.playBtn]: true,
              [styles.pauseBtn]: state.isPlay,
            })}
            onClick={togglePlay}
          >
            {state.isPlay ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon style={{ paddingLeft: "3px" }} icon={faPlay} />
            )}
          </div>
        )}
        {state.isLoading && (
          <div
            className={cls({
              [styles.playBtn]: true,
              [styles.pauseBtn]: state.isPlay,
            })}
            onClick={togglePlay}
          >
            <Image src="/images/loading.gif" width={30} height={30} />
          </div>
        )}
        <div className={cls(styles.btnWrapper)}>
          <FontAwesomeIcon icon={faForwardStep} />
        </div>
        <div className={cls(styles.btnWrapper)}>
          <FontAwesomeIcon icon={faRepeat} />
        </div>
      </div>
      <div className={cls(styles.durationBar)}>
        <span>{String(Math.floor(currentTime/60)).padStart(2, '0')}:{String(Math.floor(currentTime%60)).padStart(2, '0')}</span>
        <div className={cls(styles.sliderVolumeBase)}>
          <div className={cls(styles.sliderBar)}>
            <div style={{width: `${currentPercent}%`}} className={cls(styles.sliderVolume)}>
              <span></span>
            </div>
          </div>
        </div>

        <span>{String(Math.floor(duration/60)).padStart(2, '0')}:{String(Math.floor(duration%60)).padStart(2, '0')}</span>
      </div>
      <audio ref={audio}></audio>
    </div>
  );
}
