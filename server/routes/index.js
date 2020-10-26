const user = require("./user");
const users = require("./users");

const auth = require("./auth");
const foretag = require("./foretag");
const express = require("express");
const adminfeatures = require("./adminfeatures");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/foretag", foretag);
  app.use("/api/adminfeatures", adminfeatures);
  app.use("/api/users", users);

  app.use("/uploads", express.static("uploads"));

  app.use(error);
};
