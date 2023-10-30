"use strict";

var express = require("express");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var cookieParser = require("cookie-parser");

var app = express();
app.use(express.json());
app.use(cookieParser()); // Votre configuration de base de données
// Middleware pour vérifier l'authentification

var authenticate = function authenticate(req, res, next) {
  var accessToken = req.cookies.accessToken; // Vérifiez si le token est valide et pas expiré
  // Vérifiez également si le token existe dans la base de données et récupérez les autorisations de l'employé

  if (accessTokenIsValid) {
    req.permissions = employeePermissions; // Remplacez par les vraies autorisations de l'employé

    next();
  } else {
    res.status(401).json({
      message: "Non authentifié"
    });
  }
}; // Middleware pour vérifier l'autorisation


var authorize = function authorize(req, res, next) {
  var permission = req.params.permission; // Récupérez la permission à partir de la route ou du contrôleur

  if (req.permissions && req.permissions[permission]) {
    next();
  } else {
    res.status(403).json({
      message: "Non autorisé"
    });
  }
}; // Créer un nouvel employé


app.post("/register", function _callee(req, res) {
  var _req$body, nom, prenoms, email, password, hashedPassword, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nom = _req$body.nom, prenoms = _req$body.prenoms, email = _req$body.email, password = _req$body.password; // Hasher le mot de passe

          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 4:
          hashedPassword = _context.sent;
          // Générer un token unique
          token = jwt.sign({
            email: email
          }, "votre_secret_key"); // Enregistrez l'employé dans la base de données avec le mot de passe hashé et le token
          // N'oubliez pas de stocker les autorisations par défaut
          // Retournez la réponse avec les cookies (access token et refresh token)

          res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 60000
          }); // 1 minute d'expiration

          res.cookie("refreshToken", "refreshToken", {
            httpOnly: true
          });
          res.json({
            message: "Employé créé avec succès"
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "Erreur lors de la création de l'employé"
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Authentification de l'employé

app.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, match, newAccessToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Vérifiez si l'email et le mot de passe correspondent à ceux de la base de données

          _context2.next = 4;
          return regeneratorRuntime.awrap(bcrypt.compare(password, hashedPasswordFromDB));

        case 4:
          match = _context2.sent;

          if (match) {
            // Générez un nouvel access token
            newAccessToken = jwt.sign({
              email: email
            }, "votre_secret_key"); // Enregistrez le nouveau token dans la base de données
            // Retournez la réponse avec le nouveau access token et le refresh token

            res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              maxAge: 60000
            });
            res.cookie("refreshToken", "refreshToken", {
              httpOnly: true
            });
            res.json({
              message: "Authentification réussie"
            });
          } else {
            res.status(401).json({
              message: "Non authentifié"
            });
          }

          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Erreur lors de l'authentification"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Exemple d'utilisation de l'authentification et de l'autorisation

app.get("/route-protégée", authenticate, authorize, function (req, res) {
  // Si l'employé est authentifié et autorisé, cette route sera accessible
  res.json({
    message: "Accès autorisé"
  });
}); // Démarrer le serveur

app.listen(3000, function () {
  console.log("Serveur en cours d'exécution sur le port 3000");
});