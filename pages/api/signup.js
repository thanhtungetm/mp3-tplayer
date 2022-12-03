import connection from '../../lib/db'

export default async function handler(req, res) {
    try {
        console.log('Register:', req.body)
        const { username, password, fullname } = req.body

        const ok = await checkExistUsername(username)
        if (!ok) {
            res.status(500).json({ mess: 'Username is existed!' })
            return
        }

        connection.query(
            'INSERT INTO users (username, fullname, password) VALUES (?, ?, ?);',
            [username, fullname, password],
            function (err, result) {
                if (result.affectedRows) {
                    res.status(200).json({ mess: 'Signup successfully!' })
                }
            }
        )

        // const result = await excuteQuery({
        //     query: 'INSERT INTO users (username, fullname, password) VALUES (?, ?, ?);',
        //     values: [username, fullname, password],
        // })
        // console.log('ttt', result)
        // if (result.affectedRows) {
        //     res.status(200).json({ mess: 'Signup successfully!' })
        // }
    } catch (error) {
        console.log(error)
    }
}

const checkExistUsername = async (username) => {

    const ok =  new Promise((resolve,reject)=>{
        connection.query(
            'select * from users where username = ?',
            [username],
            function (err, result) {
                if (result.length > 0) resolve(false)
                else resolve(true)
            }
        )
    })
    

    // const result = await excuteQuery({
    //     query: 'select * from users where username = ?',
    //     values: [username],
    // })
    // if (result.length > 0) return false
    return await ok
}
