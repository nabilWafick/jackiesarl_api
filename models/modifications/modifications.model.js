const connection = require("../_db/database");

class Modifications {
  constructor(
    id,
    modification,
    details,
    date_modification,
    nom_employe,
    prenoms_employe
  ) {
    this.id = id;
    this.modification = modification;
    this.details = details;
    this.nom_employe = nom_employe;
    this.prenoms_employe = prenoms_employe;
    this.date_modification = date_modification;
  }

  static create(modificationData, callback) {
    const query =
      "INSERT INTO modifications (id, modification, details ,id_employe, date_modification) VALUES (NULL, ?, ?, ?, ?)";
    const currentDate = new Date();
    connection.query(
      query,
      [
        modificationData.modification,
        modificationData.details,
        modificationData.id_employe,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newModification = new Modifications(
          results.insertId,
          ...Object.values(modificationData),
          currentDate
        );
        return callback(null, newModification);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM modifications WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Modification non trouvée
      }
      const modificationData = results[0];
      const modification = new Modifications(
        modificationData.id,
        modificationData.modification,
        modificationData.details,
        new Date(modificationData.date_modification),
        modificationData.nom,
        modificationData.prenoms
      );
      return callback(null, modification);
    });
  }

  static getAll(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT modifications.id, modification, details, date_modification, nom, prenoms  FROM modifications, employes WHERE modifications.id_employe = employes.id AND date_modification BETWEEN ? AND ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const modificationsList = results.map((modificationData) => {
            return new Modifications(
              modificationData.id,
              modificationData.modification,
              modificationData.details,
              new Date(modificationData.date_modification),
              modificationData.nom,
              modificationData.prenoms
            );
          });
          return callback(null, modificationsList);
        }
      );
    } else {
      const query =
        "SELECT modifications.id, modification, details, date_modification, nom, prenoms  FROM modifications, employes WHERE modifications.id_employe = employes.id ORDER BY id DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const modificationsList = results.map((modificationData) => {
          // console.log(modificationData);
          return new Modifications(
            modificationData.id,
            modificationData.modification,
            modificationData.details,
            new Date(modificationData.date_modification),
            modificationData.nom,
            modificationData.prenoms
          );
        });
        return callback(null, modificationsList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE modifications SET modification = ?, details = ?, id_employe = ?, date_modification = ? WHERE id = ?";
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
    const query = "DELETE FROM modifications WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Modifications;
