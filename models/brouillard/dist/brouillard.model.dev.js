"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require("../_db/database");

var Brouillard =
/*#__PURE__*/
function () {
  function Brouillard(id, depot, stock_actuel, nom_gerant, numero_gerant, date_ajout) {
    _classCallCheck(this, Brouillard);

    this.id = id;
    this.depot = depot;
    this.stock_actuel = stock_actuel;
    this.nom_gerant = nom_gerant;
    this.numero_gerant = numero_gerant;
    this.date_ajout = date_ajout;
  }

  _createClass(Brouillard, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE brouillard SET depot = ?, stock_actuel = ?, nom_gerant = ?, numero_gerant = ?, date_ajout = ? WHERE id = ?";

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [updatedData.depot, updatedData.stock_actuel, updatedData.nom_gerant, updatedData.numero_gerant, new Date(updatedData.date_ajout), id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }, {
    key: "delete",
    value: function _delete(callback) {
      var _this = this;

      var query = "DELETE FROM brouillard WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          console.log("SQL error", error);
          return callback(error, null);
        }

        return callback(null, _this.id);
      });
    }
  }], [{
    key: "create",
    value: function create(brouillardData, callback) {
      var query = "INSERT INTO brouillard (depot, stock_actuel, nom_gerant, numero_gerant, date_ajout) VALUES (?, ?, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [brouillardData.depot, brouillardData.stock_actuel, brouillardData.nom_gerant, brouillardData.numero_gerant, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newBrouillard = new Brouillard(results.insertId, brouillardData.depot, brouillardData.stock_actuel, brouillardData.nom_gerant, brouillardData.numero_gerant, currentDate);
        return callback(null, newBrouillard);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM brouillard WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Brouillard non trouvé
        }

        var brouillardData = results[0];
        var brouillard = new Brouillard(brouillardData.id, brouillardData.depot, brouillardData.stock_actuel, brouillardData.nom_gerant, brouillardData.numero_gerant, new Date(brouillardData.date_ajout));
        return callback(null, brouillard);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM brouillard WHERE date_ajout BETWEEN ? AND ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var brouillardList = results.map(function (brouillardData) {
            return new Brouillard(brouillardData.id, brouillardData.depot, brouillardData.stock_actuel, brouillardData.nom_gerant, brouillardData.numero_gerant, new Date(brouillardData.date_ajout));
          });
          return callback(null, brouillardList);
        });
      } else {
        var _query = "SELECT * FROM brouillard ORDER BY id DESC";
        connection.query(_query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var brouillardList = results.map(function (brouillardData) {
            return new Brouillard(brouillardData.id, brouillardData.depot, brouillardData.stock_actuel, brouillardData.nom_gerant, brouillardData.numero_gerant, new Date(brouillardData.date_ajout));
          });
          return callback(null, brouillardList);
        });
      }
    }
  }]);

  return Brouillard;
}();

module.exports = Brouillard;