class AuthorisationMiddleware {
  static authorize = (permission) => {
    return (req, res, next) => {
      if (req.employee.permissions[permission]) {
        next();
      } else {
        res
          .status(403)
          .json({ status: 403, error: "Accès non permis ou interdit" });
      }
    };
  };
}

module.exports = AuthorisationMiddleware;
