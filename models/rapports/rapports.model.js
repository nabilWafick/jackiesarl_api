const connection = require("../_db/database");
const Employes = require("../../models/employes/employes.models");
class Rapports {
  constructor(id, rapport, date_envoi, id_employe, employe) {
    this.id = id;
    this.rapport = rapport;
    this.date_envoi = date_envoi;
    this.id_employe = id_employe;
    this.employe = employe;
  }

  static create(rapportData, callback) {
    const query =
      "INSERT INTO rapports (id, rapport, date_envoi, id_employe ) VALUES (NULL, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [rapportData.rapport, currentDate, rapportData.id_employe],
      (error, results) => {
        if (error) {
          //   console.log("SQL error", error);
          return callback(error, null);
        }
        const newRapport = new Rapports(
          results.insertId,
          ...Object.values(rapportData),
          currentDate
        );

        //  console.log("Insert sucessfuly and report id", results.insertId);

        return callback(null, newRapport);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM rapports WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Rapport non trouvé
      }
      const rapportData = results[0];
      const rapport = new Rapports(
        rapportData.id,
        rapportData.rapport,
        rapportData.date_envoi,
        rapportData.id_employe,
        undefined
      );
      return callback(null, rapport);
    });
  }

  static getAll(callback) {
    const query = `
    SELECT employes.id as employee_id,employes.nom, employes.prenoms,
    employes.email,employes.numero_telephone,employes.password,
    employes.role, employes.permissions, employes.token, 
    employes.date_ajout, rapports.id as id_rapport, rapports.rapport,rapports.date_envoi
    FROM employes,rapports 
    WHERE employes.id = rapports.id_employe
    ORDER BY rapports.id DESC`;
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const rapportsList = results.map((rapportData) => {
        return new Rapports(
          rapportData.id_rapport,
          rapportData.rapport,
          rapportData.date_envoi,
          rapportData.employee_id,
          new Employes(
            rapportData.employee_id,
            rapportData.nom,
            rapportData.prenoms,
            rapportData.email,
            rapportData.numero_telephone,
            "employee password",
            rapportData.role,
            "employee permissions",
            "employee token",
            rapportData.date_ajout
          )
        );
      });
      return callback(null, rapportsList);
    });
  }

  static getAllOfEmployee(employee_id, callback) {
    //  console.log("employee_id", employee_id);
    const query = `
    SELECT employes.id as employee_id,employes.nom, employes.prenoms,
    employes.email,employes.numero_telephone,employes.password,
    employes.role, employes.permissions, employes.token, 
    employes.date_ajout, rapports.id as id_rapport, rapports.rapport,rapports.date_envoi
    FROM employes,rapports 
    WHERE rapports.id_employe = ? AND employes.id = ?
    ORDER BY rapports.id DESC`;
    connection.query(query, [employee_id, employee_id], (error, results) => {
      if (error) {
        //   console.log("SQL error", error);
        return callback(error, null);
      }
      const rapportsList = results.map((rapportData) => {
        return new Rapports(
          rapportData.id_rapport,
          rapportData.rapport,
          rapportData.date_envoi,
          rapportData.employee_id,
          new Employes(
            rapportData.employee_id,
            rapportData.nom,
            rapportData.prenoms,
            rapportData.email,
            rapportData.numero_telephone,
            "employee password",
            rapportData.role,
            "employee permissions",
            "employee token",
            rapportData.date_ajout
          )
        );
      });
      //  console.log("employee rapportsList", rapportsList);
      return callback(null, rapportsList);
    });
  }

  update(callback) {
    const query =
      "UPDATE rapports SET rapport = ?, date_envoi = ?, id_employe = ? WHERE id = ?";
    const { id, ...updatedData } = this;
    connection.query(
      query,
      [...Object.values(updatedData), id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null);
      }
    );
  }

  static delete(id, callback) {
    const query = "DELETE FROM rapports WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Rapports;
