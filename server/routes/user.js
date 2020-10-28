const express = require("express");

const router = express.Router();

module.exports = router;

// Get user informations
router.get("/", (req, res) => {
  const user = (req.session.user);
  console.log(req.session.user)
  res.status(200).send({ message: "User info successfully retreived", user });
});