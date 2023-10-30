const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

// Votre configuration de base de données

// Middleware pour vérifier l'authentification
const authenticate = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  // Vérifiez si le token est valide et pas expiré
  // Vérifiez également si le token existe dans la base de données et récupérez les autorisations de l'employé
  if (accessTokenIsValid) {
    req.permissions = employeePermissions; // Remplacez par les vraies autorisations de l'employé
    next();
  } else {
    res.status(401).json({ message: "Non authentifié" });
  }
};

// Middleware pour vérifier l'autorisation
const authorize = (req, res, next) => {
  const { permission } = req.params; // Récupérez la permission à partir de la route ou du contrôleur
  if (req.permissions && req.permissions[permission]) {
    next();
  } else {
    res.status(403).json({ message: "Non autorisé" });
  }
};

// Créer un nouvel employé
app.post("/register", async (req, res) => {
  try {
    const { nom, prenoms, email, password } = req.body;
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Générer un token unique
    const token = jwt.sign({ email }, "votre_secret_key");
    // Enregistrez l'employé dans la base de données avec le mot de passe hashé et le token
    // N'oubliez pas de stocker les autorisations par défaut
    // Retournez la réponse avec les cookies (access token et refresh token)
    res.cookie("accessToken", token, { httpOnly: true, maxAge: 60000 }); // 1 minute d'expiration
    res.cookie("refreshToken", "refreshToken", { httpOnly: true });
    res.json({ message: "Employé créé avec succès" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'employé" });
  }
});

// Authentification de l'employé
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Vérifiez si l'email et le mot de passe correspondent à ceux de la base de données
    const match = await bcrypt.compare(password, hashedPasswordFromDB);
    if (match) {
      // Générez un nouvel access token
      const newAccessToken = jwt.sign({ email }, "votre_secret_key");
      // Enregistrez le nouveau token dans la base de données
      // Retournez la réponse avec le nouveau access token et le refresh token
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60000,
      });
      res.cookie("refreshToken", "refreshToken", { httpOnly: true });
      res.json({ message: "Authentification réussie" });
    } else {
      res.status(401).json({ message: "Non authentifié" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'authentification" });
  }
});

// Exemple d'utilisation de l'authentification et de l'autorisation
app.get("/route-protégée", authenticate, authorize, (req, res) => {
  // Si l'employé est authentifié et autorisé, cette route sera accessible
  res.json({ message: "Accès autorisé" });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Serveur en cours d'exécution sur le port 3000");
});
