const express = require("express");
const router = express.Router();
const Auth = require("../../controllers/auth/auth.controller");

router.post("/auth/register", Auth.register);
router.post("/auth/login", Auth.login);
router.get("/auth/verify-authentication", Auth.verifyAuthentication);
router.post("/auth/logout", Auth.logout);

module.exports = router;
