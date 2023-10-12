"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require('../_db/database');

var Avance =
/*#__PURE__*/
function () {
  function Avance(id, montant, id_client, date_avance) {
    _classCallCheck(this, Avance);

    this.id = id;
    this.montant = montant;
    this.id_client = id_client;
    this.date_avance = date_avance;
  }

  _createClass(Avance, [{
    key: "update",
    value: function update(callback) {
      var query = 'UPDATE avance SET montant = ?, id_client = ?, date_avance = ? WHERE id = ?';

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [updatedData.montant, updatedData.id_client, updatedData.date_avance, id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(avanceData, callback) {
      var query = 'INSERT INTO avance (montant, id_client, date_avance) VALUES (?, ?, ?)';
      var currentDate = new Date();
      connection.query(query, [avanceData.montant, avanceData.id_client, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newAvance = new Avance(results.insertId, avanceData.montant, avanceData.id_client, currentDate);
        return callback(null, newAvance);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = 'SELECT * FROM avance WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Avance non trouvée
        }

        var avanceData = results[0];
        var avance = new Avance(avanceData.id, avanceData.montant, avanceData.id_client, new Date(avanceData.date_avance));
        return callback(null, avance);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM avance';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var avanceList = results.map(function (avanceData) {
          return new Avance(avanceData.id, avanceData.montant, avanceData.id_client, new Date(avanceData.date_avance));
        });
        return callback(null, avanceList);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      var query = 'DELETE FROM avance WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return Avance;
}();

module.exports = Avance;