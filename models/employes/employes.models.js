const connection = require('../_db/database');

class Employes {
  constructor(id, nom, prenoms, email, password, role, token) {
    this.id = id;
    this.nom = nom;
    this.prenoms = prenoms;
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
  }

  static create(employeData, callback) {
    const query = 'INSERT INTO employes (id, nom, prenoms, email, password, role, token) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [employeData.nom, employeData.prenoms, employeData.email, employeData.password, employeData.role, employeData.token], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newEmploye = new Employes(results.insertId, ...Object.values(employeData));
      return callback(null, newEmploye);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM employes WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Employé non trouvé
      }
      const employeData = results[0];
      const employe = new Employes(
        employeData.id,
        employeData.nom,
        employeData.prenoms,
        employeData.email,
        employeData.password,
        employeData.role,
        employeData.token,
      );
      return callback(null, employe);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM employes';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const employesList = results.map((employeData) => {
        return new Employes(
          employeData.id,
          employeData.nom,
          employeData.prenoms,
          employeData.email,
          employeData.password,
          employeData.role,
          employeData.token,
        );
      });
      return callback(null, employesList);
    });
  }

  update(callback) {
    const query = 'UPDATE employes SET nom = ?, prenoms = ?, email = ?, password = ?, role = ?, token = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [...Object.values(updatedData), id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static deleteById(id, callback) {
    const query = 'DELETE FROM employes WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Employes;
