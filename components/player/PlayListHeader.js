import cls from "classnames";
import styles from "../../scss/player/PlayListHeader.module.scss";
import Image from "next/dist/client/image";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";

export function PlayListHeader() {
  const {
    state: { currentSong, isPlay },
  } = useContext(MusicPlayerContext);



  return (
    <div className={cls(styles.playlistHeader)}>
      <div className={cls({[styles.image]: true, [styles.spiner]: isPlay})}>
        <Image
          className={cls({ [styles.discSpin]: isPlay })}
          src={currentSong ? currentSong.imgUrl : "/images/disc.png"}
          width={100}
          height={100}
          layout="responsive"
        />

        <div className={cls(styles.imageOverPlay)}>
          <div>
            <FontAwesomeIcon icon={faPlay} />
          </div>
        </div>
      </div>
      <h3 className={cls(styles.name)}>{currentSong?.name}</h3>
      <h4 className={cls(styles.singer)}>{currentSong?.singer}</h4>
    </div>
  );
}
