const winston = require("winston");
const mongoose = require("mongoose");

// Connect to DB from env variable url, create instance
module.exports = function () {
  const db =
    "mongodb+srv://vall370:Expressen!2@egetprojekt-3gb59.azure.mongodb.net/test";
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(db, options)
    .then(() => winston.info(`Connected to ${db}...`));
};
