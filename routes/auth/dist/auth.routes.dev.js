"use strict";

var express = require("express");

var router = express.Router();

var Auth = require("../../controllers/auth/auth.controller");

router.post("/auth/register", Auth.register);
router.post("/auth/login", Auth.login);
router.get("/auth/verify-authentication", Auth.verifyAuthentication);
router.post("/auth/logout", Auth.logout);
module.exports = router;