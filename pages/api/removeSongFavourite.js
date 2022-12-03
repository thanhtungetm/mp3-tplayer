import connection from '../../lib/db'
export default async function handler(req, res) {
    try {
        console.log('req nom', req.body)
        const { username, songId } = req.body

        connection.query(
            'DELETE FROM favourites WHERE username = ? and id = ?',
            [username, songId],
            function (err, result) {
                if (result.error) return res.status(500).json({ mess: 'Dulicate id song' })
                res.status(200).json({ mess: 'remove favourite successfully', result })
            }
        )

        // const result = await excuteQuery({
        //     query: 'DELETE FROM favourites WHERE username = ? and id = ?',
        //     values: [username, songId],
        // })

        // if (result.error) return res.status(500).json({ mess: 'Dulicate id song' })
        // res.status(200).json({ mess: 'remove favourite successfully', result })
    } catch (error) {
        console.log(error)
    }
}
