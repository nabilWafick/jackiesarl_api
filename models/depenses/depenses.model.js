const connection = require("../_db/database");

class Depenses {
  constructor(id, description, montant, piece, est_validee, date_depense) {
    this.id = id;
    this.description = description;
    this.montant = montant;
    this.piece = piece;
    this.est_validee = est_validee;
    this.date_depense = date_depense;
  }

  static create(depenseData, callback) {
    const query =
      "INSERT INTO depenses (id, description, montant, piece, est_validee, date_depense) VALUES (NULL, ?, ?, ?, ?, ?)";

    const currentDate = new Date();

    connection.query(
      query,
      [
        depenseData.description,
        depenseData.montant,
        depenseData.piece,
        depenseData.est_validee,
        currentDate,
      ],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const newDepense = new Depenses(
          results.insertId,
          ...Object.values(depenseData),
          currentDate
        );
        return callback(null, newDepense);
      }
    );
  }

  static getById(id, callback) {
    const query = "SELECT * FROM depenses WHERE id = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Dépense non trouvée
      }
      const depenseData = results[0];
      const depense = new Depenses(
        depenseData.id,
        depenseData.description,
        depenseData.montant,
        depenseData.piece,
        depenseData.est_validee,
        depenseData.date_depense
      );
      return callback(null, depense);
    });
  }

  static getAll(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query = "SELECT * FROM depenses ORDER BY id DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  static getAllFromNewToOld(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query = "SELECT * FROM depenses ORDER BY id DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  static getAllFromOldToNew(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY id ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query = "SELECT * FROM depenses ORDER BY id ASC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  static getAllMostImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY montant DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query = "SELECT * FROM depenses ORDER BY montant DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  static getAllLessImportant(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY montant ASC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query = "SELECT * FROM depenses ORDER BY montant ASC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  static getAllValidated(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? AND est_validee = 1 ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM depenses WHERE est_validee = 1 ORDER BY id DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  static getAllUnvalidated(startDate, endDate, callback) {
    if (startDate && endDate) {
      const query =
        "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? AND est_validee = 0 ORDER BY id DESC";
      connection.query(
        query,
        [new Date(startDate), new Date(endDate)],
        (error, results) => {
          if (error) {
            return callback(error, null);
          }
          const depensesList = results.map((depenseData) => {
            return new Depenses(
              depenseData.id,
              depenseData.description,
              depenseData.montant,
              depenseData.piece,
              depenseData.est_validee,
              depenseData.date_depense
            );
          });
          return callback(null, depensesList);
        }
      );
    } else {
      const query =
        "SELECT * FROM depenses WHERE est_validee = 0 ORDER BY id DESC";
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        const depensesList = results.map((depenseData) => {
          return new Depenses(
            depenseData.id,
            depenseData.description,
            depenseData.montant,
            depenseData.piece,
            depenseData.est_validee,
            depenseData.date_depense
          );
        });
        return callback(null, depensesList);
      });
    }
  }

  update(callback) {
    const query =
      "UPDATE depenses SET description = ?, montant = ?, piece = ?, est_validee = ?, date_depense = ? WHERE id = ?";
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

  delete(callback) {
    const query = "DELETE FROM depenses WHERE id = ?";
    connection.query(query, [this.id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, this.id);
    });
  }
}

module.exports = Depenses;
