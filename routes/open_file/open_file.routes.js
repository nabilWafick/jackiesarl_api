const express = require("express");
const router = express.Router();
const OpenFileController = require("../../controllers/open_file/open_file.controller");

router.get("/open-file/:file_link", OpenFileController.open);

module.exports = router;
