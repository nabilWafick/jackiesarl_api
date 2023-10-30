const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Les employés et leurs informations (à remplir avec vos données réelles)
const employees = [];

// Fonction pour générer un token unique
function generateToken() {
  return jwt.sign({ unique: true }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
}

// Middleware pour vérifier l'authentification
function authenticate(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token invalide" });
    }

    // Ici, vous pouvez vérifier les autorisations
    const employee = employees.find((emp) => emp.token === accessToken);

    if (!employee) {
      return res.status(401).json({ error: "Employé introuvable" });
    }

    // Vérifiez les autorisations de l'employé
    if (
      !employee.permissions.some(
        (permission) => permission === "lire-tableau-bord"
      )
    ) {
      return res.status(403).json({ error: "Non autorisé" });
    }

    // Si tout est valide, continuez
    next();
  });
}

// Création d'un employé
app.post("/employees", async (req, res) => {
  try {
    const { nom, prenoms, email, password, role, permissions } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = generateToken();
    const refreshToken = generateToken();

    const newEmployee = {
      id: employees.length + 1,
      nom,
      prenoms,
      email,
      password: hashedPassword,
      role,
      permissions,
      token: accessToken,
    };

    employees.push(newEmployee);

    // Stockez l'accessToken dans un cookie
    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.status(201).json({ message: "Employé créé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Authentification de l'employé
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const employee = employees.find((emp) => emp.email === email);

  if (!employee) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  if (await bcrypt.compare(password, employee.password)) {
    const accessToken = generateToken();
    const refreshToken = generateToken();
    employee.token = accessToken;

    // Stockez l'accessToken dans un cookie
    res.cookie("accessToken", accessToken, { httpOnly: true });

    res.status(200).json({ message: "Connecté avec succès" });
  } else {
    res.status(401).json({ error: "Non authentifié" });
  }
});

// Exemple d'utilisation de l'authentification pour autoriser l'accès à une route
app.get("/tableau-bord", authenticate, (req, res) => {
  res.status(200).json({ message: "Accès autorisé au tableau de bord" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
