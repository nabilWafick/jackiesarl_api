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

var ActivitesDepot =
/*#__PURE__*/
function () {
  function ActivitesDepot(idDepot, quantiteAvantVente, vente, quantiteActuelle, versement, depense, observation, dateRemplissage) {
    _classCallCheck(this, ActivitesDepot);

    this.idDepot = idDepot;
    this.quantiteAvantVente = quantiteAvantVente;
    this.vente = vente;
    this.quantiteActuelle = quantiteActuelle;
    this.versement = versement;
    this.depense = depense;
    this.observation = observation;
    this.dateRemplissage = dateRemplissage;
  }

  _createClass(ActivitesDepot, [{
    key: "update",
    value: function update(callback) {
      var query = 'UPDATE activites_depot SET quantite_avant_vente = ?, vente = ?, quantite_actuelle = ?, versement = ?, depense = ?, observation = ?, date_remplissage = ? WHERE id_depot = ?';

      var idDepot = this.idDepot,
          updatedData = _objectWithoutProperties(this, ["idDepot"]);

      connection.query(query, [updatedData.quantiteAvantVente, updatedData.vente, updatedData.quantiteActuelle, updatedData.versement, updatedData.depense, updatedData.observation, updatedData.dateRemplissage, idDepot], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(activitesDepotData, callback) {
      var query = 'INSERT INTO activites_depot (id_depot, quantite_avant_vente, vente, quantite_actuelle, versement, depense, observation, date_remplissage) VALUES (?,?,?,?,?,?,?,?)';
      var currentDate = new Date();
      connection.query(query, [activitesDepotData.idDepot, activitesDepotData.quantiteAvantVente, activitesDepotData.vente, activitesDepotData.quantiteActuelle, activitesDepotData.versement, activitesDepotData.depense, activitesDepotData.observation, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newActivitesDepot = _construct(ActivitesDepot, _toConsumableArray(Object.values(activitesDepotData)).concat([currentDate]));

        return callback(null, newActivitesDepot);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = 'SELECT * FROM activites_depot WHERE id_depot = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Activité dépôt non trouvée
        }

        var activitesDepotData = results[0];
        var activitesDepot = new ActivitesDepot(activitesDepotData.id_depot, activitesDepotData.quantite_avant_vente, activitesDepotData.vente, activitesDepotData.quantite_actuelle, activitesDepotData.versement, activitesDepotData.depense, activitesDepotData.observation, new Date(activitesDepotData.date_remplissage));
        return callback(null, activitesDepot);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM activites_depot';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var activitesDepotList = results.map(function (activitesDepotData) {
          return new ActivitesDepot(activitesDepotData.id_depot, activitesDepotData.quantite_avant_vente, activitesDepotData.vente, activitesDepotData.quantite_actuelle, activitesDepotData.versement, activitesDepotData.depense, activitesDepotData.observation, new Date(activitesDepotData.date_remplissage));
        });
        return callback(null, activitesDepotList);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id, callback) {
      var query = 'DELETE FROM activites_depot WHERE id_depot = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return ActivitesDepot;
}();

module.exports = ActivitesDepot;