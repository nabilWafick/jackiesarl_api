"use strict";

app.post("/authentification", function _callee(req, res) {
  var _req$body, email, password, accessToken, refreshToken;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            _req$body = req.body, email = _req$body.email, password = _req$body.password; // Vérification de l'email et du mot de passe dans la base de données
            // ...
            // Si les informations sont valides, génération d'un access token

            if (validCredentials) {
              accessToken = jwt.sign({
                email: email
              }, "votre_clé_secrète", {
                expiresIn: "1m"
              });
              refreshToken = jwt.sign({
                email: email
              }, "votre_autre_clé_secrète", {
                expiresIn: "7d"
              }); // Stockage du refreshToken dans la base de données
              // ...

              res.cookie("accessToken", accessToken);
              res.cookie("refreshToken", refreshToken);
              res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
              });
            } else {
              res.status(401).send("Authentification échouée.");
            }
          } catch (error) {
            console.error(error);
            res.status(500).send("Erreur lors de l'authentification.");
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/authentification", function _callee2(req, res) {
  var _req$body2, email, password, accessToken, refreshToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Vérification de l'email et du mot de passe dans la base de données
            // ...
            // Si les informations sont valides, génération d'un access token

            if (validCredentials) {
              accessToken = jwt.sign({
                email: email
              }, "votre_clé_secrète", {
                expiresIn: "1m"
              });
              refreshToken = jwt.sign({
                email: email
              }, "votre_autre_clé_secrète", {
                expiresIn: "7d"
              }); // Stockage du refreshToken dans la base de données
              // ...

              res.cookie("accessToken", accessToken);
              res.cookie("refreshToken", refreshToken);
              res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
              });
            } else {
              res.status(401).send("Authentification échouée.");
            }
          } catch (error) {
            console.error(error);
            res.status(500).send("Erreur lors de l'authentification.");
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});

var verifyToken = function verifyToken(req, res, next) {
  var accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).send("Non authentifié");
  }

  try {
    var decoded = jwt.verify(accessToken, "votre_clé_secrète");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Token invalide");
  }
};

var checkPermission = function checkPermission(req, res, next) {
  // Récupération des autorisations de l'employé depuis la base de données
  // ...
  var permissionRequise = req.body.permissionRequise;

  if (permissions[permissionRequise]) {
    next();
  } else {
    res.status(403).send("Non autorisé");
  }
};

app.post("/route-protégée", verifyToken, checkPermission, function (req, res) {
  res.json({
    message: "Accès autorisé"
  });
}); // ...