"use strict";

var express = require("express");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcrypt");

var cookieParser = require("cookie-parser");

var app = express();
app.use(express.json());
app.use(cookieParser()); // Les employés et leurs informations (à remplir avec vos données réelles)

var employees = []; // Fonction pour générer un token unique

function generateToken() {
  return jwt.sign({
    unique: true
  }, process.env.JWT_SECRET, {
    expiresIn: "1m"
  });
} // Middleware pour vérifier l'authentification


function authenticate(req, res, next) {
  var accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      error: "Non authentifié"
    });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        error: "Token invalide"
      });
    } // Ici, vous pouvez vérifier les autorisations


    var employee = employees.find(function (emp) {
      return emp.token === accessToken;
    });

    if (!employee) {
      return res.status(401).json({
        error: "Employé introuvable"
      });
    } // Vérifiez les autorisations de l'employé


    if (!employee.permissions.some(function (permission) {
      return permission === "lire-tableau-bord";
    })) {
      return res.status(403).json({
        error: "Non autorisé"
      });
    } // Si tout est valide, continuez


    next();
  });
} // Création d'un employé


app.post("/employees", function _callee(req, res) {
  var _req$body, nom, prenoms, email, password, role, permissions, hashedPassword, accessToken, refreshToken, newEmployee;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nom = _req$body.nom, prenoms = _req$body.prenoms, email = _req$body.email, password = _req$body.password, role = _req$body.role, permissions = _req$body.permissions;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 4:
          hashedPassword = _context.sent;
          accessToken = generateToken();
          refreshToken = generateToken();
          newEmployee = {
            id: employees.length + 1,
            nom: nom,
            prenoms: prenoms,
            email: email,
            password: hashedPassword,
            role: role,
            permissions: permissions,
            token: accessToken
          };
          employees.push(newEmployee); // Stockez l'accessToken dans un cookie

          res.cookie("accessToken", accessToken, {
            httpOnly: true
          });
          res.status(201).json({
            message: "Employé créé avec succès"
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: "Erreur serveur"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // Authentification de l'employé

app.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, employee, accessToken, refreshToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          employee = employees.find(function (emp) {
            return emp.email === email;
          });

          if (employee) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            error: "Non authentifié"
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(bcrypt.compare(password, employee.password));

        case 6:
          if (!_context2.sent) {
            _context2.next = 14;
            break;
          }

          accessToken = generateToken();
          refreshToken = generateToken();
          employee.token = accessToken; // Stockez l'accessToken dans un cookie

          res.cookie("accessToken", accessToken, {
            httpOnly: true
          });
          res.status(200).json({
            message: "Connecté avec succès"
          });
          _context2.next = 15;
          break;

        case 14:
          res.status(401).json({
            error: "Non authentifié"
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Exemple d'utilisation de l'authentification pour autoriser l'accès à une route

app.get("/tableau-bord", authenticate, function (req, res) {
  res.status(200).json({
    message: "Accès autorisé au tableau de bord"
  });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Serveur en cours d'ex\xE9cution sur le port ".concat(PORT));
});