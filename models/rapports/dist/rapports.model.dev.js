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

var connection = require("../_db/database");

var Employes = require("../../models/employes/employes.models");

var Rapports =
/*#__PURE__*/
function () {
  function Rapports(id, rapport, date_envoi, id_employe, employe) {
    _classCallCheck(this, Rapports);

    this.id = id;
    this.rapport = rapport;
    this.date_envoi = date_envoi;
    this.id_employe = id_employe;
    this.employe = employe;
  }

  _createClass(Rapports, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE rapports SET rapport = ?, date_envoi = ?, id_employe = ? WHERE id = ?";

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [].concat(_toConsumableArray(Object.values(updatedData)), [id]), function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(rapportData, callback) {
      var query = "INSERT INTO rapports (id, rapport, date_envoi, id_employe ) VALUES (NULL, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [rapportData.rapport, currentDate, rapportData.id_employe], function (error, results) {
        if (error) {
          //   console.log("SQL error", error);
          return callback(error, null);
        }

        var newRapport = _construct(Rapports, [results.insertId].concat(_toConsumableArray(Object.values(rapportData)), [currentDate])); //  console.log("Insert sucessfuly and report id", results.insertId);


        return callback(null, newRapport);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM rapports WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Rapport non trouvé
        }

        var rapportData = results[0];
        var rapport = new Rapports(rapportData.id, rapportData.rapport, rapportData.date_envoi, rapportData.id_employe, undefined);
        return callback(null, rapport);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "\n    SELECT employes.id as employee_id,employes.nom, employes.prenoms,\n    employes.email,employes.numero_telephone,employes.password,\n    employes.role, employes.permissions, employes.token, \n    employes.date_ajout, rapports.id as id_rapport, rapports.rapport,rapports.date_envoi\n    FROM employes,rapports \n    WHERE employes.id = rapports.id_employe\n    ORDER BY rapports.id DESC";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var rapportsList = results.map(function (rapportData) {
          return new Rapports(rapportData.id_rapport, rapportData.rapport, rapportData.date_envoi, rapportData.employee_id, new Employes(rapportData.employee_id, rapportData.nom, rapportData.prenoms, rapportData.email, rapportData.numero_telephone, "employee password", rapportData.role, "employee permissions", "employee token", rapportData.date_ajout));
        });
        return callback(null, rapportsList);
      });
    }
  }, {
    key: "getAllOfEmployee",
    value: function getAllOfEmployee(employee_id, callback) {
      //  console.log("employee_id", employee_id);
      var query = "\n    SELECT employes.id as employee_id,employes.nom, employes.prenoms,\n    employes.email,employes.numero_telephone,employes.password,\n    employes.role, employes.permissions, employes.token, \n    employes.date_ajout, rapports.id as id_rapport, rapports.rapport,rapports.date_envoi\n    FROM employes,rapports \n    WHERE rapports.id_employe = ? AND employes.id = ?\n    ORDER BY rapports.id DESC";
      connection.query(query, [employee_id, employee_id], function (error, results) {
        if (error) {
          //   console.log("SQL error", error);
          return callback(error, null);
        }

        var rapportsList = results.map(function (rapportData) {
          return new Rapports(rapportData.id_rapport, rapportData.rapport, rapportData.date_envoi, rapportData.employee_id, new Employes(rapportData.employee_id, rapportData.nom, rapportData.prenoms, rapportData.email, rapportData.numero_telephone, "employee password", rapportData.role, "employee permissions", "employee token", rapportData.date_ajout));
        }); //  console.log("employee rapportsList", rapportsList);

        return callback(null, rapportsList);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      var query = "DELETE FROM rapports WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return Rapports;
}();

module.exports = Rapports;