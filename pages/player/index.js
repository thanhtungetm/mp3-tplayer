import cls from "classnames";
import { Header } from "../../components/common/Header";
import styles from "../../scss/player/index.module.scss";
import Head from "next/head";
import { PlayerCotrol, PlayList } from "../../components/player/";
import { useEffect, useReducer } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import songReducer from "../../reducers/SongReducer";
import NavBar from "../../components/player/NavBar";

export default function ({ songs }) {
  useEffect(() => {
    console.log(songs);
  }, [songs]);

  const [state, dispatch] = useReducer(songReducer, {
    currentSong: null,
    isPlay: false,
    isLoading: true,
    volume: 0.5
  });
  // console.log(state)
  return (
    <>
      <Head>
        <title>MP3 Player</title>
      </Head>
      <MusicPlayerContext.Provider value={{ songs, state, dispatch }}>
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
  const res = await fetch("http://localhost:3000/api/songs");
  const data = await res.json();
  const songs = data.data;
  // Pass data to the page via props
  return { props: { songs } };
}
