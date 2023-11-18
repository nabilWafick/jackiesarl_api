const express = require("express");
const router = express.Router();

router.use("*", (req, res, next) => {
  res.status(404).json({
    status: 404,
    error: "Route non définie",
  });
});

module.exports = router;
