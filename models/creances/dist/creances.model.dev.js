"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require('../_db/database');

var Creances =
/*#__PURE__*/
function () {
  function Creances(id, creanceCimBenin, creanceNocibe, creanceAutres, dateCreance, idClient) {
    _classCallCheck(this, Creances);

    this.id = id;
    this.creanceCimBenin = creanceCimBenin;
    this.creanceNocibe = creanceNocibe;
    this.creanceAutres = creanceAutres;
    this.dateCreance = dateCreance;
    this.idClient = idClient;
  }

  _createClass(Creances, [{
    key: "update",
    value: function update(callback) {
      var query = 'UPDATE creances SET ? WHERE id = ?';

      var id = this.id,
          creanceData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [creanceData, id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(creanceData, callback) {
      var query = 'INSERT INTO creances SET ?';
      connection.query(query, creanceData, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newCreance = _construct(Creances, [results.insertId].concat(_toConsumableArray(Object.values(creanceData))));

        return callback(null, newCreance);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = 'SELECT * FROM creances WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Créance non trouvée
        }

        var creanceData = results[0];
        var creance = new Creances(creanceData.id, creanceData.creance_cim_benin, creanceData.creance_nocibe, creanceData.creance_autres, creanceData.date_creance, creanceData.id_client);
        return callback(null, creance);
      });
    } // Méthode pour récupérer toutes les entrées de la table creances

  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM creances';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var creances = results.map(function (creanceData) {
          return new Creances(creanceData.id, creanceData.creance_cim_benin, creanceData.creance_nocibe, creanceData.creance_autres, creanceData.date_creance, creanceData.id_client);
        });
        return callback(null, creances);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id, callback) {
      var query = 'DELETE FROM creances WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return Creances;
}();

module.exports = Creances;