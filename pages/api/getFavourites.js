
import { ZingMp3 } from 'zingmp3-api-full'
import connection from '../../lib/db'

export default async function handler(req, res) {
    try {
        const { username } = req.body
        console.log('GET Favourite: ', username)

        connection.query(
            'select * from users, favourites where users.username = favourites.username and  users.username = ?',
            [username],
            function (err, result) {
                if (result.length === 0 && err) return res.status(500).json({ mess: 'Error' })
                res.status(200).json({ mess: 'ok', list: result })
            }
        )

        // const result = await excuteQuery({
        //     query: 'select * from users, favourites where users.username = favourites.username and  users.username = ?',
        //     values: [username],
        // })
        // if (result.length === 0) return res.status(500).json({ mess: 'Error' })

        // const data = []
        // for (let item of result) {
        //     const songInfo = await ZingMp3.getInfoSong(item.song_id)
        //     const song = songInfo.data
        //     // data.push(songInfo)
        //     data.push({
        //         id: song.encodeId,
        //         name: song.title,
        //         singer: song.artistsNames,
        //         imgUrl: song.thumbnailM,
        //         time: `${String(Math.floor(song.duration / 60)).padStart(2, '0')} : ${String(
        //             Math.floor(song.duration % 60)
        //         ).padStart(2, '0')}`,
        //     })
        // }

       
    } catch (error) {
        console.log(error)
    }
}
