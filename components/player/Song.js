import Image from "next/dist/client/image";
import cls from "classnames";
import styles from "../../scss/player/Song.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart } from "@fortawesome/free-solid-svg-icons";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import { useContext, useEffect, useRef } from "react";

function Song({ song, noneHeart, handleNewSong }) {
  const songRef = useRef(null);
  

  const { name, singer, time, imgUrl } = song;
  const {
    dispatch,
    state: { currentSong, isLoading },
  } = useContext(MusicPlayerContext);

  const isActive = currentSong?.id === song.id

  useEffect(() => {
    if (isActive) {
      songRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSong]);

  const playSong = async () => {

    if (song.id === currentSong.id) return;
    if (handleNewSong) {
      handleNewSong(song);
    }
    dispatch({ type: "PAUSE" });
    dispatch({ type: "SET_LOADING" });

    if (!song.source) {
      console.log("Not source, get Source");
      const res = await fetch("/api/song/" + song.id);
      const data = await res.json();

      song.source = data.data.data["128"];
    } else {
      console.log("Alredy has the source");
    }

    

    
    dispatch({ type: "SET_SONG", song: song });
    
  };

  

  return (
    <div
      ref={songRef}
      className={cls([styles.song], { [styles.active]: isActive })}
      onClick={playSong}
    >
      <div className={cls(styles.name)}>
        <div className={cls(styles.avtImg)}>
          <Image src={imgUrl} width={35} height={35}></Image>
          {currentSong !== song ? (
            <div>
              <FontAwesomeIcon icon={faPlay} />
            </div>
          ) : (
            <div className={cls({ [styles.playingGif]: isActive })}>
              <Image src="/images/playing.gif" width={20} height={20} />
            </div>
          )}
        </div>

        <div>
          <span>{name}</span>
          <span className={styles.singerHidden}>{singer}</span>
        </div>
      </div>
      <div className={cls(styles.singer)}>
        <span>{singer}</span>
        {!noneHeart && <FontAwesomeIcon icon={faHeart} />}
      </div>
      {!noneHeart && <div className={cls(styles.time)}>{time}</div>}
    </div>
  );
}

export default Song;
