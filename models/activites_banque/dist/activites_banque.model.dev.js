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

var ActivitesBanque =
/*#__PURE__*/
function () {
  function ActivitesBanque(id, id_banque, description, debit, credit, solde, date_activite) {
    _classCallCheck(this, ActivitesBanque);

    this.id = id;
    this.id_banque = id_banque;
    this.description = description;
    this.debit = debit;
    this.credit = credit;
    this.solde = solde;
    this.date_activite = date_activite;
  }

  _createClass(ActivitesBanque, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE activites_banque SET id_banque = ?, description = ?, debit = ?, credit = ?, solde = ?, date_activite = ? WHERE id_banque = ?";

      var id_banque = this.id_banque,
          updatedData = _objectWithoutProperties(this, ["id_banque"]);

      connection.query(query, [updatedData.id_banque, updatedData.description, updatedData.debit, updatedData.credit, updatedData.solde, updatedData.date_activite, id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(activitesBanqueData, callback) {
      var query = "INSERT INTO activites_banque (id,id_banque, description, debit, credit, solde, date_activite) VALUES (NULL,?,?,?,?,?,?)";
      var currentDate = new Date();
      connection.query(query, [activitesBanqueData.id_banque, activitesBanqueData.description, activitesBanqueData.debit, activitesBanqueData.credit, activitesBanqueData.solde, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newActivitesBanque = _construct(ActivitesBanque, _toConsumableArray(Object.values(activitesBanqueData)).concat([currentDate]));

        return callback(null, newActivitesBanque);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM activites_banque WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Activité banque non trouvée
        }

        var activitesBanqueData = results[0];
        var activitesBanque = new ActivitesBanque(activitesBanqueData.id, activitesBanqueData.id_banque, activitesBanqueData.description, activitesBanqueData.debit, activitesBanqueData.credit, activitesBanqueData.solde, new Date(activitesBanqueData.date_activite));
        return callback(null, activitesBanque);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT * FROM activites_banque";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var activitesBanqueList = results.map(function (activitesBanqueData) {
          return new ActivitesBanque(activitesBanqueData.id, activitesBanqueData.id_banque, activitesBanqueData.description, activitesBanqueData.debit, activitesBanqueData.credit, activitesBanqueData.solde, new Date(activitesBanqueData.date_activite));
        });
        return callback(null, activitesBanqueList);
      });
    }
  }, {
    key: "getAllByBanqueID",
    value: function getAllByBanqueID(id_banque, callback) {
      var query = "SELECT * FROM activites_banque WHERE id_banque = ?";
      connection.query(query, [id_banque], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var activitesBanqueList = results.map(function (activitesBanqueData) {
          return new ActivitesBanque(activitesBanqueData.id, activitesBanqueData.id_banque, activitesBanqueData.description, activitesBanqueData.debit, activitesBanqueData.credit, activitesBanqueData.solde, new Date(activitesBanqueData.date_activite));
        });
        return callback(null, activitesBanqueList);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      var query = "DELETE FROM activites_banque WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return ActivitesBanque;
}();

module.exports = ActivitesBanque;