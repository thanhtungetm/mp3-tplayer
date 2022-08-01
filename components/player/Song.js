import Image from "next/dist/client/image";
import cls from "classnames"
import styles from "../../scss/player/Song.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import { useContext, useRef } from "react";

function Song({ song }) {
    const { name, singer, time, imgUrl } = song;
    const {dispatch, state: { currentSong, isLoading}} = useContext(MusicPlayerContext)

    // console.log(song)

  const playSong = ()=>{
    // console.log("Play song")
    dispatch({type: 'PAUSE'})
    dispatch({type: 'SET_SONG', song: song})
    dispatch({type: 'SET_LOADING'})
  }

    return (
      <div className={cls([styles.song], {[styles.active]: currentSong == song})} onClick={playSong}>
        <div className={cls(styles.name)}>
          <div className={cls(styles.avtImg)}>
            <Image src={imgUrl} width={35} height={35}></Image>
            { currentSong !== song ? <div>
              <FontAwesomeIcon icon={faPlay} />
            </div>
            :
            <div className={cls({[styles.playingGif]: currentSong == song})}>
              <Image src='/images/playing.gif' width={20} height={20} />
            </div>}
          </div>
          
          <span>{name}</span>
        </div>
        <div className={cls(styles.singer)}>
          <span>{singer}</span>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className={cls(styles.time)}>{time}</div>
      </div>
    );
  }
  
export default Song;