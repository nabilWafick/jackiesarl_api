"use strict";

var express = require("express");

var router = express.Router();

var OpenFileController = require("../../controllers/open_file/open_file.controller");

router.get("/open-file/:file_link", OpenFileController.open);
module.exports = router;