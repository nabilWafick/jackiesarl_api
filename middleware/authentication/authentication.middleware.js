const jwt = require("jsonwebtoken");
const Employes = require("../../models/employes/employes.models");

class AuthenticationMiddleware {
  static authenticate = (req, res, next) => {
    // console.log("In Authentication Middleware");
    const authHeader = req.headers["authorization-tokens"];

    const accessToken = authHeader && authHeader.split(" ")[1];
    const token = authHeader && authHeader.split(" ")[2];

    if (!accessToken || !token) {
      //  console.log("Not Authenticated");
      return res.status(401).json({ status: 401, error: "Non Authentifié" });
    }

    // ===================== User token Verification

    jwt.verify(
      token,
      process.env.JWT_USER_TOKEN_KEY,
      (verificationError, decoded) => {
        if (verificationError) {
          return res
            .status(401)
            .json({ status: 401, error: "Non authentifié" });
        }

        Employes.getByEmail(decoded.email, (employee_error, employee) => {
          if (employee_error) {
            console.log("Not Authenticated");
            return res
              .status(401)
              .json({ status: 401, error: "Non authentifié" });
          }

          if (!employee) {
            console.log("Not Authenticated");
            return res
              .status(401)
              .json({ status: 401, error: "Non authentifié" });
          }

          // ===================  token verification succeed

          jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_KEY,
            (verificationError, decoded) => {
              if (verificationError) {
                return res
                  .status(401)
                  .json({ status: 401, error: "Non authentifié" });
              }

              Employes.getByEmail(decoded.email, (employee_error, employee) => {
                if (employee_error) {
                  console.log("Not Authenticated");
                  return res
                    .status(401)
                    .json({ status: 401, error: "Non authentifié" });
                }

                if (!employee) {
                  console.log("Not Authenticated");
                  return res
                    .status(401)
                    .json({ status: 401, error: "Non authentifié" });
                }

                req.employee = employee;

                next();
              });
            }
          );
        });
      }
    );
  };
}

module.exports = AuthenticationMiddleware;

/**
 * {
    const authHeader = req.headers["Authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    const token = authHeader && authHeader.split(" ")[2];

    if (!accessToken || !token) {
      return res.status(401).json({ status: 401, error: "Non Authentifié" });
    }
 
    // ===================== User token Verification

    jwt.verify(
      token,
      process.env.JWT_USER_TOKEN_KEY,
      (verificationError, decoded) => {
        if (verificationError) {
          return res
            .status(401)
            .json({ status: 401, error: "Non authentifié" });
        }

        Employes.getByEmail(decoded.email, (employee_error, employee) => {
          if (employee_error)
            return res
              .status(401)
              .json({ status: 401, error: "Non authentifié" });

          if (!employee)
            return res
              .status(401)
              .json({ status: 401, error: "Non authentifié" });

          // ===================  token verification succeed

          jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_TOKEN_KEY,
            (verificationError, decoded) => {
              if (verificationError) {
                return res
                  .status(401)
                  .json({ status: 401, error: "Non authentifié" });
              }

              Employes.getByEmail(decoded.email, (employee_error, employee) => {
                if (employee_error)
                  return res
                    .status(401)
                    .json({ status: 401, error: "Non authentifié" });

                if (!employee)
                  return res
                    .status(401)
                    .json({ status: 401, error: "Non authentifié" });

                req.employee = employee;

                next();
              });
            }
          );
        });
      }
    );
  };
 */
