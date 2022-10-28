const mysql = require('mysql')

const connection = mysql.createConnection({
    // 'host':'localhost',
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'root',
    'database': 'taskelectron'
})

//******* TASK */

module.exports.getTasks = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM tasks', (err, rows) => {
            if (err) {
                throw err
            } else {
                callback(rows)
            }
        })
    }
}
module.exports.insertTask = function (dataTask, callback) {
    if (connection) {
        connection.query('INSERT INTO tasks SET ?', dataTask, (err, results) => {
            if (err) {
                throw err
            } else {
                callback(results.insertId)
            }
        })
    }
}
module.exports.updateTask = function (id, dataTask, callback) {
    if (connection) {
        connection.query('UPDATE tasks SET ? WHERE id = ?', [dataTask, id], (err, results) => {
            if (err) {
                throw err
            } else {
                callback(id)
            }
        })
    }
}
module.exports.deleteTask = function (id, callback) {
    if (connection) {
        connection.query('DELETE FROM tasks WHERE id = ?', id, (err, results) => {
            if (err) {
                throw err
            } else {
                callback(id)
            }
        })
    }
}

//******* USER */
module.exports.insertUser = function (dataUser, callback) {
    if (connection) {
        connection.query('INSERT INTO users SET ?', dataUser, (err, results) => {
            if (err) {
                throw err
            } else {
                callback(results.insertId)
            }
        })
    }
}

module.exports.userLogin = function (username, password, callback) {

    if (connection) {
        connection.query('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, rows) => {
            if (err) {
                throw err
            } else {

                if (rows.length) {


                    const user_id = rows[0].id
                    const tokenRan = Math.random().toString(36).substring(7)

                    connection.query('DELETE FROM user_tokens WHERE user_id = ?', user_id)

                    const dataToken = {
                        user_id: user_id,
                        token: tokenRan
                    }

                    connection.query('INSERT INTO user_tokens SET ?', dataToken, (err, results) => {
                        if (err) {
                            callback({
                                login: false,
                                user: null
                            })
                        } else {
                            callback({
                                login: true,
                                user: rows[0],
                                token: tokenRan
                            })
                        }
                    })

                } else {
                    callback({
                        login: false,
                        user: null
                    })
                }
            }
        })
    }
}

//******* USER TOKEN */
module.exports.getUserToken = function (token, callback) {
    if (connection) {
        connection.query('SELECT u.id, u.name, u.username FROM user_tokens ut JOIN users as u ON u.id = ut.user_id WHERE ut.token = ?', token, (err, rows) => {
            if (err) {
                throw err
            } else {
                if (rows.length)
                    callback(rows[0])
                else
                    callback({})
            }
        })
    }
}
module.exports.logout = function (token) {
    if (connection) {
        connection.query('DELETE FROM user_tokens WHERE token = ?', token, (err) => {
            if (err) {
                throw err
            } 
        })
    }
}