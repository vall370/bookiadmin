const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'host.docker.internal',
  database: 'booki',
  user: 'root',
  multipleStatements: true,
  insecureAuth: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = connection;
