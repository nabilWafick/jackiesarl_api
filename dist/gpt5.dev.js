"use strict";

var express = require("express");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var cookieParser = require("cookie-parser");

var app = express();
app.use(express.json());
app.use(cookieParser()); // Configuration de la base de données fictive (à remplacer par votre propre configuration)

var employeesDB = [{
  id: 1,
  nom: "Nom1",
  prenoms: "Prenoms1",
  email: "email1@example.com",
  password: "motdepasse1hash",
  // Le mot de passe doit être déjà hashé
  role: "Role1",
  permissions: {
    // Les autorisations par défaut
    admin: false,
    "lire-tableau-bord": false,
    "ajouter-client": false // ...
    // Vous pouvez ajouter toutes les autorisations ici

  },
  token: "token1"
} // Ajoutez d'autres employés avec leurs données ici
];
var accessTokenSecret = "votre_access_token_secret";
var refreshTokenSecret = "votre_refresh_token_secret"; // Middleware pour vérifier l'authentification

var authenticate = function authenticate(req, res, next) {
  var accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Non authentifié"
    });
  }

  try {
    var decoded = jwt.verify(accessToken, accessTokenSecret);
    var employee = employeesDB.find(function (e) {
      return e.email === decoded.email;
    });

    if (!employee) {
      return res.status(401).json({
        message: "Non authentifié"
      });
    }

    req.employee = employee;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Non authentifié"
    });
  }
}; // Middleware pour vérifier l'autorisation


var authorize = function authorize(permission) {
  return function (req, res, next) {
    if (req.employee.permissions[permission]) {
      next();
    } else {
      res.status(403).json({
        message: "Non autorisé"
      });
    }
  };
}; // Création d'un nouvel employé


app.post("/register", function _callee(req, res) {
  var _req$body, nom, prenoms, email, password, role, permissions, hashedPassword, token, refreshToken, newEmployee;

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
          token = jwt.sign({
            email: email
          }, accessTokenSecret, {
            expiresIn: "7d"
          });
          refreshToken = jwt.sign({
            email: email
          }, refreshTokenSecret);
          newEmployee = {
            id: employeesDB.length + 1,
            nom: nom,
            prenoms: prenoms,
            email: email,
            password: hashedPassword,
            role: role,
            permissions: permissions,
            token: token,
            refreshToken: refreshToken
          };
          employeesDB.push(newEmployee); // Retournez une réponse avec les cookies (access token et refresh token)

          res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
          }); // 7 jours d'expiration

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true
          });
          res.json({
            message: "Employé créé avec succès"
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "Erreur lors de la création de l'employé"
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); // Authentification de l'employé

app.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, employee, match, newAccessToken, newRefreshToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          employee = employeesDB.find(function (e) {
            return e.email === email;
          });

          if (employee) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: "Non authentifié"
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, employee.password));

        case 7:
          match = _context2.sent;

          if (match) {
            newAccessToken = jwt.sign({
              email: email
            }, accessTokenSecret, {
              expiresIn: "7d"
            });
            newRefreshToken = jwt.sign({
              email: email
            }, refreshTokenSecret);
            employee.token = newAccessToken;
            employee.refreshToken = newRefreshToken; // Retournez la réponse avec les cookies (nouveau access token et refresh token)

            res.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.cookie("refreshToken", newRefreshToken, {
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

          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Erreur lors de l'authentification"
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Utilisation unique du refresh token pour renouveler l'access token

app.post("/refresh", function (req, res) {
  var refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Non authentifié"
    });
  }

  try {
    var decoded = jwt.verify(refreshToken, refreshTokenSecret);
    var employee = employeesDB.find(function (e) {
      return e.email === decoded.email;
    });

    if (!employee || employee.refreshToken !== refreshToken) {
      return res.status(401).json({
        message: "Non authentifié"
      });
    }

    var newAccessToken = jwt.sign({
      email: decoded.email
    }, accessTokenSecret, {
      expiresIn: "7d"
    });
    employee.token = newAccessToken; // Retournez la réponse avec le nouveau access token

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({
      message: "Access token renouvelé"
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Non authentifié"
    });
  }
}); // Exemple d'utilisation de l'authentification et de l'autorisation

app.get("/route-protegee", authenticate, authorize("lire-tableau-bord"), function (req, res) {
  // Si l'employé est authentifié et autorisé, cette route sera accessible
  res.json({
    message: "Accès autorisé"
  });
});
app.listen(3000, function () {
  console.log("Serveur en cours d'exécution sur le port 3000");
});