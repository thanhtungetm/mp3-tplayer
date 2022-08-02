// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {ZingMp3} from 'zingmp3-api-full'

export default function handler(req, res) {

  getSongList().then((data)=>{
    res.status(200).json({ data: data})
  })
}

async function getSongList(){
  const songList = []

    for(let song of list){
      const data = await ZingMp3.getInfoSong(song)
      const playData =  await ZingMp3.getSong(song)
      // console.log(data)
      const time = data.data.duration
      const songInfo = {}

      songInfo.id = data.data.encodeId
      songInfo.name = data.data.title
      songInfo.singer = data.data.artistsNames
      songInfo.imgUrl = data.data.thumbnailM
      
      songInfo.time = `${String(Math.floor(time/60)).padStart(2, '0')} : ${String(Math.floor(time%60)).padStart(2, '0')}`
      songInfo.source = playData.data['128']
      songList.push(songInfo)
    }

    return songList;
}


const list =[
  'ZZDI7978',
  'ZZDW807B',
  'ZZE886WC',
  'ZWBUB79W',
  'ZZDI9B7U',
  'ZZDBZWZI',
  'ZZD9DO7A',
  'ZWZECUAO',
  'ZWFZACOC',
]