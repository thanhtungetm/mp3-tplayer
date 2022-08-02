import cls from "classnames";
import { Header } from "../../components/common/Header";
import styles from "../../scss/player/index.module.scss";
import Head from "next/head";
import { PlayerCotrol, PlayList } from "../../components/player/";
import { useEffect, useReducer, useState } from "react";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import songReducer from "../../reducers/SongReducer";
import NavBar from "../../components/player/NavBar";

const fixedData = [
  {
    "id": "ZZDI7978",
    "name": "Bằng Lăng Nở Hoa",
    "singer": "Anh Rồng, G5R Squad",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/6/8/2/5/6825cac216a2e2c5e54c183862ba6abd.jpg",
    "time": "03 : 55",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/328a0476fd3714694d26/2157152561325447928?authen=exp=1659595342~acl=/328a0476fd3714694d26/*~hmac=59ff622776dfddfb516981ad1a4b23c9&fs=MTY1OTQyMjU0Mjk5M3x3ZWJWNnwwfDExNS43NS4zNy4xMjY"
  },
  {
    "id": "ZZDW807B",
    "name": "Bố Vợ Chất Chơi (Remix)",
    "singer": "Huỳnh Văn",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/8/4/3/d843db87478bb8ea6e29c3aca3581212.jpg",
    "time": "03 : 26",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/0b829d1766568f08d647/6979560909018578482?authen=exp=1659595108~acl=/0b829d1766568f08d647/*~hmac=9bc703b6f5e7c3425c96c2056cc01390&fs=MTY1OTQyMjMwODmUsIC5M3x3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZZE886WC",
    "name": "Ngôi Sao Cô Đơn",
    "singer": "Jack - J97",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/2/e/b/e2eb2e4c19e54ab61871ce9f04ac339f.jpg",
    "time": "04 : 36",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/66c408efdcae35f06cbf/2779850410373472121?authen=exp=1659595109~acl=/66c408efdcae35f06cbf/*~hmac=8a86533c6bb0f8b521a163e5ed0286aa&fs=MTY1OTQyMjMwOTM4NXx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZWBUB79W",
    "name": "Nụ Cười 18 20 (Remix)",
    "singer": "Doãn Hiếu, BMZ",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/2/a/f/82afcc633cc979c20481d8ddbae41386.jpg",
    "time": "04 : 36",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/0535aaeea6a94ff716b8/8170356884360268096?authen=exp=1659595598~acl=/0535aaeea6a94ff716b8/*~hmac=e920888ae710ba742a08c03c3f022279&fs=MTY1OTQyMjmUsIC5ODYyMHx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZZDI9B7U",
    "name": "Vì Mẹ Anh Bắt Chia Tay",
    "singer": "Miu Lê, Karik, Châu Đăng Khoa",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/b/8/9/1b8958017b04a663eb8c093905dd4d85.jpg",
    "time": "04 : 22",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/656217daee9b07c55e8a/2674514253420310719?authen=exp=1659595076~acl=/656217daee9b07c55e8a/*~hmac=083c701e6723f1e6ee9eb900d12b0728&fs=MTY1OTQyMjI3Njk0MHx3ZWJWNnwwfDExOC42OC4xNjUdUngMjA1"
  },
  {
    "id": "ZZDBZWZI",
    "name": "Hết Sảy Miền Tây",
    "singer": "Tracy Thảo My",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/a/0/a/9a0af1b65bd4985149959020f0a0bb3e.jpg",
    "time": "04 : 00",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/a8c5b1bb54fabda4e4eb/943988874358131978?authen=exp=1659595104~acl=/a8c5b1bb54fabda4e4eb/*~hmac=95d07df6d6bd576e939d60ae8121d3ac&fs=MTY1OTQyMjMwNDY1Mnx3ZWJWNnwxMDE1OTIxOTmUsIC0fDExMy4xNzYdUngMTE2LjI1"
  },
  {
    "id": "ZZD9DO7A",
    "name": "Xin Má Rước Dâu (Remix Version)",
    "singer": "Diệu Kiên",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/4/4/c/c44c3822217d8775780358df759f126d.jpg",
    "time": "03 : 37",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/f5fc7a709031796f2020/7629712808103229137?authen=exp=1659595597~acl=/f5fc7a709031796f2020/*~hmac=67a614e76d0bff78e1a16bcdfe6029b9&fs=MTY1OTQyMjmUsIC5Nzk3NXx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZWZECUAO",
    "name": "Beautiful In White",
    "singer": "Hero Band",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/d/6/d6f465a5de88497aaf7efd3a70f45dcf_1341979628.jpg",
    "time": "03 : 52",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/75e905340070e92eb061/3400680322898737192?authen=exp=1659595381~acl=/75e905340070e92eb061/*~hmac=a68ca40cf6bef0efa882dbf6fb6842b2&fs=MTY1OTQyMjU4MTY5OXx3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  },
  {
    "id": "ZWFZACOC",
    "name": "Sánh Duyên",
    "singer": "Nana Liu, Tracy Thảo My",
    "imgUrl": "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/1/2/d/c12df14116654ccd1965de98cef37277.jpg",
    "time": "04 : 26",
    "source": "https://mp3-s1-zmp3.zmdcdn.me/54d3da1062578b09d246/6377637198494972984?authen=exp=1659595113~acl=/54d3da1062578b09d246/*~hmac=aa77171c4835958feb9e1f4ccd9d8aa6&fs=MTY1OTQyMjMxMzM1M3x3ZWJWNnwwfDE0LjE5MS4xOTAdUngMjUx"
  }
]

export default function Player () {

  const [songs, setSongs] = useState(fixedData)



  // useEffect(() => {
  //   const res = await fetch("http://localhost:3000/api/songs");
  //   const data = await res.json();
  //   setSongs(data)
  // }, []);

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

// // This gets called on every request
// export async function getServerSideProps() {
//   const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/songs`);
//   const data = await res.json();
//   const songs = data.data;
//   // Pass data to the page via props
//   return { props: { songs } };
// }
