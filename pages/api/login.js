import connection from '../../lib/db'
export default async function handler(req, res) {
    try {
        console.log('req nom', req.body)
        const { username, password } = req.body
        connection.query(
            'select * from users where username = ? and password = ?',
            [username, password],
            function (err, results) {
                console.log(results)
                if (results.length === 0) return res.status(500).json({ mess: 'Error' })
                res.status(200).json({ mess: 'ok', user: results[0] })
            }
        )
        // excuteQuery({
        //     query: 'select * from users where username = ? and password = ?',
        //     values: [username, password],
        // })
        // console.log('Res', rows, fields)
    } catch (error) {
        ;``
        console.log(error)
    }
}
