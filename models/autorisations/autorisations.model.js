const connection = require('../_db/database');

class Autorisations {
  constructor(id, role, autorisations) {
    this.id = id;
    this.role = role;
    this.autorisations = autorisations;
  }

  static create(autorisationsData, callback) {
    const query = 'INSERT INTO autorisations (role, autorisations) VALUES (?, ?)';
    connection.query(query, [autorisationsData.role, autorisationsData.autorisations], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const newAutorisations = new Autorisations(results.insertId, autorisationsData.role, autorisationsData.autorisations);
      return callback(null, newAutorisations);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM autorisations WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Autorisations non trouvées
      }
      const autorisationsData = results[0];
      const autorisations = new Autorisations(autorisationsData.id, autorisationsData.role, autorisationsData.autorisations);
      return callback(null, autorisations);
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM autorisations';
    connection.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      const autorisationsList = results.map((autorisationsData) => {
        return new Autorisations(autorisationsData.id, autorisationsData.role, autorisationsData.autorisations);
      });
      return callback(null, autorisationsList);
    });
  }

  update(callback) {
    const query = 'UPDATE autorisations SET role = ?, autorisations = ? WHERE id = ?';
    const { id, ...updatedData } = this;
    connection.query(query, [updatedData.role, updatedData.autorisations, id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM autorisations WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null);
    });
  }
}

module.exports = Autorisations;
