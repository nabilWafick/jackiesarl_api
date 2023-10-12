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

var AchatClient =
/*#__PURE__*/
function () {
  function AchatClient(id, quantite_achetee, categorie, montant, numero_ctp, bordereau, numero_bc, id_client, date_achat) {
    _classCallCheck(this, AchatClient);

    this.id = id;
    this.quantite_achetee = quantite_achetee;
    this.categorie = categorie;
    this.montant = montant;
    this.numero_ctp = numero_ctp;
    this.bordereau = bordereau;
    this.numero_bc = numero_bc;
    this.id_client = id_client;
    this.date_achat = date_achat;
  }

  _createClass(AchatClient, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE achat_client SET quantite_achetee = ?, categorie = ?, montant = ?, numero_ctp = ?, bordereau = ?, numero_bc = ?, id_client = ?, date_achat = ? WHERE achat_client.id = ?";

      var id = this.id,
          achatClientData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat), id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }, {
    key: "delete",
    value: function _delete(callback) {
      var query = "DELETE FROM achat_client WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(achatClientData, callback) {
      var query = "INSERT INTO achat_client (id, quantite_achetee, categorie, montant, numero_ctp, bordereau, numero_bc, id_client, date_achat) VALUES (NULL,?,?,?,?,?,?,?,?)";
      var currentDate = new Date();
      connection.query(query, [achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newAchatClient = _construct(AchatClient, [results.insertId].concat(_toConsumableArray(Object.values(achatClientData)), [currentDate]));

        return callback(null, newAchatClient);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM achat_client WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Achat client non trouvé
        }

        var achatClientData = results[0];
        var achatClient = new AchatClient(achatClientData.id, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
        return callback(null, achatClient);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT * FROM achat_client";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var achatsClients = results.map(function (achatClientData) {
          return new AchatClient(achatClientData.id, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
        });
        return callback(null, achatsClients);
      });
    }
  }, {
    key: "getAllOfClient",
    value: function getAllOfClient(id_client, callback) {
      var query = "SELECT * FROM achat_client WHERE id_client = ?";
      connection.query(query, [id_client], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var achatsClients = results.map(function (achatClientData) {
          // console.log(typeof achatClientData.quantite_achetee);
          return new AchatClient(achatClientData.id, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
        });
        return callback(null, achatsClients);
      });
    }
  }]);

  return AchatClient;
}();

module.exports = AchatClient;