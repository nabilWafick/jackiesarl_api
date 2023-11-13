const express = require("express");
const router = express.Router();
const Auth = require("../../controllers/auth/auth.controller");
const AuthorisationMiddleware = require("../../middleware/authorisation/authorisation.middleware");
const AuthenticationMiddleware = require("../../middleware/authentication/authentication.middleware");

router.post("/auth/register", Auth.register);
router.post(
  "/auth/login",
  //AuthorisationMiddleware.authorize("admin"),
  Auth.login
);
router.get(
  "/auth/verify-authentication",
  //AuthenticationMiddleware.authenticate,
  //AuthorisationMiddleware.authorize("admin"),
  Auth.verifyAuthentication
);
router.post("/auth/logout", Auth.logout);

module.exports = router;
