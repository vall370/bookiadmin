const winston = require("winston");
const passport = require("passport");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
/* const express = require("express");
 */const MySQLStore = require('express-mysql-session')(session);


const port = process.env.PORT || 3900;
var app = require('express')();
const morgan = require('morgan');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const httplogger = require("./startup/logger/httplogger");
const connection = require("./startup/db.config");

require("./startup/passport/passport-setup")();
require("./startup/logging")();
require("./startup/validation")();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/prod")(app);
var options = {
  host: 'host.docker.internal',
  port: 3306,
  user: 'root',
  database: 'booki'
};
var sessionStore = new MySQLStore(options);
/* app.use(httplogger);
 */
// Create session
app.use(
  session({
    // Used to compute a hash
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    // Store session on DB
    store: sessionStore,
  })
);

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/index")(app);
app.use(morgan(":method :url :status :response-time ms - :res[content-length]"));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  console.log('a client connected');

  connection.query('SELECT * FROM booking',function(err,rows){
    if(err) throw err;
    console.log('Data received from Db:\n');
/*     console.log(rows);
 */    socket.emit('showrows', rows);
  });



});

http.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});