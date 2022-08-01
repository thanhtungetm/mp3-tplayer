import cls from "classnames";
import styles from "../../scss/player/PlayListContent.module.scss";
import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Song from "./Song";
import { useContext } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";

// const songs = [
//   { name: "Gió vẫn hát", singer: "Hương Ly", time: "04:23", imgUrl: 'miule.jpg'},
//   { name: "Ai là người thương em", singer: "Quân A.P", time: "04:23", imgUrl: 'alnte.jpg' },
//   { name: "Đừng yêu nữa, em mệt rồi", singer: "Hương Ly", time: "04:23",imgUrl: 'dyn.jpg' },
//   { name: "Xinh tươi Việt Nam", singer: "V.Music", time: "04:23" , imgUrl: 'miule.jpg'},
//   { name: "Cầm tay anh và đi", singer: "Linh Hee", time: "04:23",imgUrl: 'dyn.jpg'  },
//   { name: "Độ ta không độ nàng", singer: "Hương Ly", time: "04:23", time: "04:23",imgUrl: 'dyn.jpg'  },
//   { name: "Sao em vô tình", singer: "J97", time: "04:23" , imgUrl: 'miule.jpg'},
//   { name: "Gió vẫn hát", singer: "Hương Ly", time: "04:23" ,imgUrl: 'dyn.jpg' },
//   { name: "Ai là người thương em", singer: "Quân A.P", time: "04:23", time: "04:23",imgUrl: 'dyn.jpg'  },
//   { name: "Đừng yêu nữa, em mệt rồi", singer: "Hương Ly", time: "04:23" , imgUrl: 'miule.jpg'},
//   { name: "Xinh tươi Việt Nam", singer: "V.Music", time: "04:23",imgUrl: 'dyn.jpg'  },
//   { name: "Cầm tay anh và đi", singer: "Linh Hee", time: "04:23", time: "04:23",imgUrl: 'dyn.jpg'  },
//   { name: "Độ ta không độ nàng", singer: "Hương Ly", time: "04:23" , imgUrl: 'miule.jpg'},
//   { name: "Sao em vô tình", singer: "J97", time: "04:23",imgUrl: 'dyn.jpg'  },
//   { name: "Gió vẫn hát", singer: "Hương Ly", time: "04:23" , time: "04:23",imgUrl: 'dyn.jpg' },
//   { name: "Ai là người thương em", singer: "Quân A.P", time: "04:23" , imgUrl: 'miule.jpg'},
//   { name: "Đừng yêu nữa, em mệt rồi", singer: "Hương Ly", time: "04:23" },
//   { name: "Xinh tươi Việt Nam", singer: "V.Music", time: "04:23" , time: "04:23",imgUrl: 'dyn.jpg' },
//   { name: "Cầm tay anh và đi", singer: "Linh Hee", time: "04:23" },
//   { name: "Độ ta không độ nàng", singer: "Hương Ly", time: "04:23" , imgUrl: 'miule.jpg'},
//   { name: "Sao em vô tình", singer: "J97", time: "04:23" },
// ];

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