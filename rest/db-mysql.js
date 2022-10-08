const mysql = require('mysql')

const connection = mysql.createConnection({
   // 'host':'localhost',
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'root',
    'database': 'taskelectron'
})

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
        connection.query('INSERT INTO tasks SET ?', dataTask ,(err, results) => {
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
        connection.query('UPDATE tasks SET ? WHERE id = ?', [dataTask, id] ,(err, results) => {
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
        connection.query('DELETE FROM tasks WHERE id = ?', id ,(err, results) => {
            if (err) {
                throw err
            } else {
                callback(id)
            }
        })
    }
}
