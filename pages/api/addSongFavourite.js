import connection from '../../lib/db'
export default async function handler(req, res) {
    try {
        console.log('req nom', req.body)
        const { username, id,name,singer,img,time} = req.body

        connection.query(
            'INSERT INTO favourites (username, id,name,singer,img,time) VALUES (?, ?,?,?,?,?)',
            [username, id,name,singer,img,time],
            function (err, result) {
                if (result.error){
                    console.log(result)
                    return res.status(500).json({ mess: 'Dulicate id song' })
                } 
                res.status(200).json({ mess: 'add favourite successfully', result })
            }
        )
        // const result = await excuteQuery({
        //     query: 'INSERT INTO favourites (username, id,name,singer,img,time) VALUES (?, ?,?,?,?,?)',
        //     values: [username, id,name,singer,img,time],
        // })

        // if (result.error){
        //     console.log(result)
        //     return res.status(500).json({ mess: 'Dulicate id song' })
        // } 
        // res.status(200).json({ mess: 'add favourite successfully', result })
    } catch (error) {
        console.log(error)
    }
}
