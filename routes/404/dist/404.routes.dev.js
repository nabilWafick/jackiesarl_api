"use strict";

var express = require("express");

var router = express.Router();
router.use("*", function (req, res, next) {
  res.status(404).json({
    status: 404,
    error: "Route non définie"
  });
});
module.exports = router;