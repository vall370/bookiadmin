const user = require("./user");
const auth = require("./auth");
const foretag = require("./foretag");
const express = require("express");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/foretag", foretag);
  app.use("/uploads", express.static("uploads"));

  app.use(error);
};
