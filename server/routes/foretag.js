const express = require("express");

const router = express.Router();
const Foretag = require("../StaticData/Foretag.json");

module.exports = router;

// Get user informations
router.get("/", (req, res) => {
  const result = Foretag;

  res.status(200).send(result);
});
