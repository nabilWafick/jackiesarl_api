"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require('../_db/database');

var Autorisations =
/*#__PURE__*/
function () {
  function Autorisations(id, role, autorisations) {
    _classCallCheck(this, Autorisations);

    this.id = id;
    this.role = role;
    this.autorisations = autorisations;
  }

  _createClass(Autorisations, [{
    key: "update",
    value: function update(callback) {
      var query = 'UPDATE autorisations SET role = ?, autorisations = ? WHERE id = ?';

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [updatedData.role, updatedData.autorisations, id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(autorisationsData, callback) {
      var query = 'INSERT INTO autorisations (role, autorisations) VALUES (?, ?)';
      connection.query(query, [autorisationsData.role, autorisationsData.autorisations], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newAutorisations = new Autorisations(results.insertId, autorisationsData.role, autorisationsData.autorisations);
        return callback(null, newAutorisations);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = 'SELECT * FROM autorisations WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Autorisations non trouvées
        }

        var autorisationsData = results[0];
        var autorisations = new Autorisations(autorisationsData.id, autorisationsData.role, autorisationsData.autorisations);
        return callback(null, autorisations);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM autorisations';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var autorisationsList = results.map(function (autorisationsData) {
          return new Autorisations(autorisationsData.id, autorisationsData.role, autorisationsData.autorisations);
        });
        return callback(null, autorisationsList);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id, callback) {
      var query = 'DELETE FROM autorisations WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return Autorisations;
}();

module.exports = Autorisations;