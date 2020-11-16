const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'booki',
  multipleStatements: true,
  insecureAuth: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = connection;
