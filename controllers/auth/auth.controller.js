const Employes = require("../../models/employes/employes.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  static verifyAuthentication = async (req, res) => {
    const authHeader = req.headers["authorization-tokens"];

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

                res.status(202).json({ status: 200, message: "Authentifié" });
              });
            }
          );
        });
      }
    );
  };

  // ============================= Register

  static register = async (req, res) => {
    const { nom, prenoms, email, numero_telephone, role, password } = req.body;

    Employes.getAll(async (employees_error, employees) => {
      if (employees_error) {
        return res
          .status(500)
          .json({ status: 500, error: "Erreur lors de la création du client" });
      }

      const errors = {
        firstname: null,
        lastname: null,
        email: null,
        phoneNumber: null,
      };

      let exist = false;

      employees.forEach((employee) => {
        if (employee.prenoms == prenoms && employee.nom == nom) {
          exist = true;
          errors.firstname = "Ce prénom existe déjà";
          errors.lastname = "Ce nom existe déjà";
        }
        if (email == employee.email) {
          exist = true;
          errors.email = "Cet email existe déjà";
        }
        if (numero_telephone == employee.numero_telephone) {
          exist = true;
          errors.phoneNumber = "Ce numéro de téléphone existe déjà";
        }
      });

      // console.log("exist:", exist);

      if (exist == true) {
        return res.status(406).json({ status: 406, errors: errors });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const token = jwt.sign({ email }, process.env.JWT_USER_TOKEN_KEY);

      const employeData = {
        nom: nom,
        prenoms: prenoms,
        email: email,
        numero_telephone: numero_telephone,
        role: role,
        password: hashedPassword,
        token: token,
      };

      Employes.create(employeData, (error, employe) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la création de l'employé",
          });
        }
        return res.status(201).json({ status: 201, employe });
      });
    });
  };

  // ============================= Login

  static login = async (req, res) => {
    const { email, password } = req.body;

    Employes.getByEmail(email, async (employeError, employe) => {
      if (employeError) {
        res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de l'employé",
        });
      }

      if (!employe) {
        res.status(404).json({
          status: 404,
          error: "Employé non trouvé ou l'email n'existe pas",
        });
      }

      const match = await bcrypt.compare(password, employe.password);

      if (match) {
        const newAccessToken = jwt.sign(
          { email },
          process.env.JWT_ACCESS_TOKEN_KEY,
          {
            expiresIn: "5m",
          }
        );
        const authenticatedEmployee = {
          ...employe,
          accessToken: newAccessToken,
        };
        res.status(202).json({
          status: 202,
          employe: authenticatedEmployee,
          accessToken: newAccessToken,
        });
      } else {
        res.status(401).json({ status: 401, error: "Mot de passe incorrecte" });
      }
    });
  };

  // ============================== Logout

  static logout = (req, res) => {
    req.clearCookie("accessToken");
    res.status("200").json({ status: 200, error: "Déonnecté avec succès" });
  };
}

module.exports = AuthController;
