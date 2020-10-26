const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'booki'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = connection;
