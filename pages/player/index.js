import cls from "classnames";
import Head from "next/head";
import { useReducer, useState } from "react";
import { Header } from "../../components/common/Header";
import { PlayerCotrol, PlayList } from "../../components/player/";
import NavBar from "../../components/player/NavBar";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import songReducer from "../../reducers/SongReducer";
import styles from "../../scss/player/index.module.scss";

export default function Player(props) {
  // const {songs} = props
  const [songs, setSongs] = useState(props.songs);

  const [state, dispatch] = useReducer(songReducer, {
    currentSong: null,
    isPlay: false,
    isLoading: true,
    volume: 0.5,
    mode: "RA",
  });

  const addSource = (idSong, source) => {
    const newSongs = [...songs];
    const song = newSongs.find((s) => s.id === idSong);
    song.source = source;
  };
  const addNewSong = (song) => {
    if (songs.find((s) => s.id === song.id)) return;
    const newSongs = [song, ...songs];
    setSongs(newSongs);
  };

  return (
    <>
      <Head>
        <title>MP3 Player</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <MusicPlayerContext.Provider
        value={{ songs, state, addSource, addNewSong, dispatch }}
      >
        <div className={cls(styles.wrapper)}>
          <div className={cls(styles.container)}>
            <div className={cls(styles.navbar)}>
              <NavBar />
            </div>
            <div className={cls(styles.content)}>
              <Header />
              <PlayList />
            </div>
            <PlayerCotrol />
          </div>
        </div>
      </MusicPlayerContext.Provider>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  console.log("ENV", process.env.HOST);
  const res = await fetch(`${process.env.HOST}/api/getTop`);
  const data = await res.json();
  const songs = data.data;
  // Pass data to the page via props
  return { props: { songs } };
}
