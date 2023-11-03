const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configuration de la base de données fictive (à remplacer par votre propre configuration)
const employeesDB = [
  {
    id: 1,
    nom: "Nom1",
    prenoms: "Prenoms1",
    email: "email1@example.com",
    password: "motdepasse1hash", // Le mot de passe doit être déjà hashé
    role: "Role1",
    permissions: {
      // Les autorisations par défaut
      admin: false,
      "lire-tableau-bord": false,
      "ajouter-client": false,
      // ...
      // Vous pouvez ajouter toutes les autorisations ici
    },
    token: "token1",
  },
  // Ajoutez d'autres employés avec leurs données ici
];

const accessTokenSecret = "votre_access_token_secret";
const refreshTokenSecret = "votre_refresh_token_secret";

// Middleware pour vérifier l'authentification
const authenticate = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const decoded = jwt.verify(accessToken, accessTokenSecret);
    const employee = employeesDB.find((e) => e.email === decoded.email);

    if (!employee) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    req.employee = employee;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Non authentifié" });
  }
};

// Middleware pour vérifier l'autorisation
const authorize = (permission) => {
  return (req, res, next) => {
    if (req.employee.permissions[permission]) {
      next();
    } else {
      res.status(403).json({ message: "Non autorisé" });
    }
  };
};

// Création d'un nouvel employé
app.post("/register", async (req, res) => {
  try {
    const { nom, prenoms, email, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, accessTokenSecret, { expiresIn: "5m" });
    //   const refreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: "5m" });
    const newEmployee = {
      id: employeesDB.length + 1,
      nom,
      prenoms,
      email,
      password: hashedPassword,
      role,
      permissions,
      token,
      refreshToken,
    };
    employeesDB.push(newEmployee);
    // Retournez une réponse avec les cookies (access token et refresh token)
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 jours d'expiration
    //   res.cookie("refreshToken", refreshToken, { httpOnly: true });
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
    const employee = employeesDB.find((e) => e.email === email);

    if (!employee) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const match = await bcrypt.compare(password, employee.password);

    if (match) {
      const newAccessToken = jwt.sign({ email }, accessTokenSecret, {
        expiresIn: "7d",
      });
      const newRefreshToken = jwt.sign({ email }, refreshTokenSecret);
      employee.token = newAccessToken;
      employee.refreshToken = newRefreshToken;
      // Retournez la réponse avec les cookies (nouveau access token et refresh token)
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
      res.json({ message: "Authentification réussie" });
    } else {
      res.status(401).json({ message: "Non authentifié" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'authentification" });
  }
});

// Utilisation unique du refresh token pour renouveler l'access token
app.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Non authentifié" });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);
    const employee = employeesDB.find((e) => e.email === decoded.email);

    if (!employee || employee.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const newAccessToken = jwt.sign(
      { email: decoded.email },
      accessTokenSecret,
      { expiresIn: "7d" }
    );
    employee.token = newAccessToken;
    // Retournez la réponse avec le nouveau access token
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Access token renouvelé" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Non authentifié" });
  }
});

// Exemple d'utilisation de l'authentification et de l'autorisation
app.get(
  "/route-protegee",
  authenticate,
  authorize("lire-tableau-bord"),
  (req, res) => {
    // Si l'employé est authentifié et autorisé, cette route sera accessible
    res.json({ message: "Accès autorisé" });
  }
);

app.listen(3000, () => {
  console.log("Serveur en cours d'exécution sur le port 3000");
});
