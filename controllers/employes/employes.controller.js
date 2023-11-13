const Employes = require("../../models/employes/employes.models");
const jwt = require("jsonwebtoken");
class EmployesController {
  // Créer un nouvel employé
  static create = async (req, res) => {
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
        } else if (errors.email == email) {
          exist = true;
          errors.email = "Cet email existe déjà";
        } else if (errors.phoneNumber == numero_telephone) {
          exist = true;
          errors.phoneNumber = "Ce numéro de téléphone existe déjà";
        }
      });

      console.log("exist:", exist);

      if (exist == true) {
        return res.status(406).json({ status: 406, errors: errors });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const token = jwt.sign({ email }, process.env.JWT_USER_TOKEN_KEY);
      const employeeData = {
        nom: nom,
        prenoms: prenoms,
        email: email,
        numero_telephone: numero_telephone,
        role: role,
        password: hashedPassword,
        token: token,
      };
      Employes.create(employeeData, (error, employe) => {
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

  // Récupérer un employé par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Employes.getById(id, (error, employe) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'employé" });
      }
      if (!employe) {
        return res.status(404).json({ error: "Employé non trouvé" });
      }
      return res.status(200).json({
        ...employe,
        password: "Employee Password",
        token: "Employee Token",
      });
    });
  };

  static getAll = (req, res) => {
    Employes.getAll((error, employes) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des employés" });
      }
      return res.status(200).json(employes);
    });
  };

  // Mettre à jour un employé par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    // console.log("updatedData", updatedData);
    Employes.getById(id, (getError, existingEmploye) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'employé" });
      }
      if (!existingEmploye) {
        return res.status(404).json({ error: "Employé non trouvé" });
      }

      //   console.log("existingEmploye", existingEmploye);

      existingEmploye = {
        ...existingEmploye,
        permissions: updatedData.permissions,
      };

      //   console.log("new employee data", existingEmploye);
      existingEmploye = new Employes(
        existingEmploye.id,
        existingEmploye.nom,
        existingEmploye.prenoms,
        existingEmploye.email,
        existingEmploye.numero_telephone,
        existingEmploye.password,
        existingEmploye.role,
        existingEmploye.permissions,
        existingEmploye.token,
        existingEmploye.date_ajout
      );
      existingEmploye.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de l'employé" });
        }
        return res.status(200).json({ status: 200, employee: existingEmploye });
      });
    });
  };

  // Supprimer un employé par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Employes.getById(id, (getError, existingEmploye) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'employé" });
      }
      if (!existingEmploye) {
        return res.status(404).json({ error: "Employé non trouvé" });
      }
      existingEmploye.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'employé" });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = EmployesController;
