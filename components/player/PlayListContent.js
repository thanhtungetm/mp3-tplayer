import cls from "classnames";
import styles from "../../scss/player/PlayListContent.module.scss";
import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Song from "./Song";
import { useContext } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";


function PlayListContent() {

  const {songs} = useContext(MusicPlayerContext)
  // console.log("Song from context",songs)
  return (
    <div className={cls(styles.playListContent, styles.scroll)}>
      <div className={cls(styles.songsList)}>
        <div className={cls(styles.listHead)}>
          <div className={cls(styles.name)}>Bài hát</div>
          <div className={cls(styles.singer)}>Ca sĩ</div>
          <div className={cls(styles.time)}>Thời gian</div>
        </div>

        {songs.map((song, index) => (
          <Song song={song} key={index} />
        ))}
      </div>
    </div>
  );
}

export default PlayListContent;