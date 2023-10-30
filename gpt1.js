app.post("/authentification", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification de l'email et du mot de passe dans la base de données
    // ...

    // Si les informations sont valides, génération d'un access token
    if (validCredentials) {
      const accessToken = jwt.sign({ email }, "votre_clé_secrète", {
        expiresIn: "1m",
      });
      const refreshToken = jwt.sign({ email }, "votre_autre_clé_secrète", {
        expiresIn: "7d",
      });

      // Stockage du refreshToken dans la base de données
      // ...

      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).send("Authentification échouée.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'authentification.");
  }
});

app.post("/authentification", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification de l'email et du mot de passe dans la base de données
    // ...

    // Si les informations sont valides, génération d'un access token
    if (validCredentials) {
      const accessToken = jwt.sign({ email }, "votre_clé_secrète", {
        expiresIn: "1m",
      });
      const refreshToken = jwt.sign({ email }, "votre_autre_clé_secrète", {
        expiresIn: "7d",
      });

      // Stockage du refreshToken dans la base de données
      // ...

      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).send("Authentification échouée.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'authentification.");
  }
});

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).send("Non authentifié");
  }

  try {
    const decoded = jwt.verify(accessToken, "votre_clé_secrète");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Token invalide");
  }
};

const checkPermission = (req, res, next) => {
  // Récupération des autorisations de l'employé depuis la base de données
  // ...

  const { permissionRequise } = req.body;

  if (permissions[permissionRequise]) {
    next();
  } else {
    res.status(403).send("Non autorisé");
  }
};

app.post("/route-protégée", verifyToken, checkPermission, (req, res) => {
  res.json({ message: "Accès autorisé" });
});

// ...
