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

var Clients = require("../clients/clients.model");

var PaiementClient =
/*#__PURE__*/
function () {
  function PaiementClient(id, client, montant, banque, reference, categorie, numero_bc, bordereau, est_valide, id_client, date_paiement) {
    _classCallCheck(this, PaiementClient);

    this.id = id;
    this.client = client;
    this.montant = montant;
    this.banque = banque;
    this.reference = reference;
    this.categorie = categorie;
    this.numero_bc = numero_bc;
    this.bordereau = bordereau;
    this.est_valide = est_valide;
    this.id_client = id_client;
    this.date_paiement = date_paiement;
  }

  _createClass(PaiementClient, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE paiement_client SET montant = ?, banque = ?, reference = ?, categorie = ?, numero_bc = ?, bordereau = ?, est_valide = ?, id_client = ?, date_paiement = ? WHERE id = ?";

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [updatedData.montant, updatedData.banque, updatedData.reference, updatedData.categorie, updatedData.numero_bc, updatedData.bordereau, updatedData.est_valide, updatedData.id_client, updatedData.date_paiement, id], function (error, results) {
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

      var query = "DELETE FROM paiement_client WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        return callback(null, _this.id);
      });
    }
  }], [{
    key: "create",
    value: function create(paiementData, callback) {
      var query = "INSERT INTO paiement_client (id, montant, banque, reference, categorie, numero_bc, bordereau, est_valide, id_client, date_paiement) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newPaiement = _construct(PaiementClient, [results.insertId, undefined].concat(_toConsumableArray(Object.values(paiementData)), [currentDate]));

        return callback(null, newPaiement);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM paiement_client WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Paiement client non trouvé
        }

        var paiementData = results[0];
        var paiement = new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
        return callback(null, paiement);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\nFROM\n    clients, paiement_client \nWHERE\nclients.id = paiement_client.id_client;\n";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var paiementsList = results.map(function (paiementData) {
          return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
        });
        return callback(null, paiementsList);
      });
    }
  }, {
    key: "getAllOfClient",
    value: function getAllOfClient(id_client, callback) {
      var query = "SELECT * FROM paiement_client WHERE id_client = ?";
      connection.query(query, [id_client], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var paiementsList = results.map(function (paiementData) {
          // console.log(typeof PaiementClientData.quantite_achetee);
          return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
        });
        return callback(null, paiementsList);
      });
    }
  }]);

  return PaiementClient;
}();

module.exports = PaiementClient;