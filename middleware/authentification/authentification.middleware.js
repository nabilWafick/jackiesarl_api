const jwt = require('jsonwebtoken');

// Middleware d'authentification
function authenticationMiddleware(req, res, next) {
  // Récupérez le jeton d'authentification depuis l'en-tête de la requête
  const token = req.header('Authorization');

  // Vérifiez si le jeton est présent
  if (!token) {
    return res.status(401).json({ message: 'Non autorisé - Jeton manquant' });
  }

  try {
    // Vérifiez et décodez le jeton (vous devrez utiliser votre clé secrète ici)
    const decodedToken = jwt.verify(token, 'votre_cle_secrete');

    // Ajoutez les données de l'utilisateur à la requête pour une utilisation ultérieure
    req.user = decodedToken.user;

    // L'utilisateur est authentifié, continuez le traitement
    next();
  } catch (error) {
    // Le jeton est invalide
    return res.status(401).json({ message: 'Non autorisé - Jeton invalide' });
  }
}

module.exports = authenticationMiddleware;
