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
    value: function getAll(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.id DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.id DESC;";
        connection.query(_query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllFromNewToOld",
    value: function getAllFromNewToOld(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.id DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query2 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.id DESC;";
        connection.query(_query2, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllFromOldToNew",
    value: function getAllFromOldToNew(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.id ASC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query3 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.id ASC;";
        connection.query(_query3, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllMostImportant",
    value: function getAllMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.montant DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query4 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.montant DESC;";
        connection.query(_query4, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllLessImportant",
    value: function getAllLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.montant ASC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query5 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client\n      ORDER BY paiement_client.montant ASC;";
        connection.query(_query5, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllNOCIBEMostImportant",
    value: function getAllNOCIBEMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'NOCIBE' AND\n      ORDER BY paiement_client.montant DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query6 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'NOCIBE' AND\n      ORDER BY paiement_client.montant DESC;";
        connection.query(_query6, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllNOCIBELessImportant",
    value: function getAllNOCIBELessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'NOCIBE' AND\n      ORDER BY paiement_client.montant ASC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query7 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'NOCIBE' AND\n      ORDER BY paiement_client.montant ASC;";
        connection.query(_query7, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllCIMBENINMostImportant",
    value: function getAllCIMBENINMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'CIM BENIN' AND\n      ORDER BY paiement_client.montant DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query8 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'CIM BENIN' AND\n      ORDER BY paiement_client.montant DESC";
        connection.query(_query8, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllCIMBENINLessImportant",
    value: function getAllCIMBENINLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'CIM BENIN' AND\n      ORDER BY paiement_client.montant ASC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query9 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client AND\n      paiement_client.categorie = 'CIM BENIN' AND\n      ORDER BY paiement_client.montant ASC";
        connection.query(_query9, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllValidated",
    value: function getAllValidated(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client AND\n      paiement_client.est_valide = 1 \n      ORDER BY paiement_client.id DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query10 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client AND\n      paiement_client.est_valide = 1 \n      ORDER BY paiement_client.id DESC;";
        connection.query(_query10, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    }
  }, {
    key: "getAllUnValidated",
    value: function getAllUnValidated(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      paiement_client.id AS id,\n      paiement_client.montant AS montant,\n      paiement_client.banque,\n      paiement_client.reference,\n      paiement_client.categorie,\n      paiement_client.numero_bc,\n      paiement_client.bordereau,\n      paiement_client.est_valide,\n      paiement_client.id_client AS id_client,\n      paiement_client.date_paiement\n      FROM\n      clients, paiement_client\n      WHERE\n      paiement_client.date_paiement BETWEEN ? AND ? AND\n      clients.id = paiement_client.id_client AND\n      paiement_client.est_valide = 0\n      ORDER BY paiement_client.id DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query11 = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    paiement_client.id AS id,\n    paiement_client.montant AS montant,\n    paiement_client.banque,\n    paiement_client.reference,\n    paiement_client.categorie,\n    paiement_client.numero_bc,\n    paiement_client.bordereau,\n    paiement_client.est_valide,\n    paiement_client.id_client AS id_client,\n    paiement_client.date_paiement\n    FROM\n      clients, paiement_client\n      WHERE\n      clients.id = paiement_client.id_client AND\n      paiement_client.est_valide = 0\n      ORDER BY paiement_client.id DESC;";
        connection.query(_query11, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            return new PaiementClient(paiementData.id, new Clients(paiementData.id_client, paiementData.nom, paiementData.prenoms, paiementData.numero_ifu, paiementData.numero_telephone, paiementData.email, paiementData.date_ajout), paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      }
    } // Selected Client

  }, {
    key: "getAllOfClient",
    value: function getAllOfClient(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query12 = "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY id DESC";
        connection.query(_query12, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientFromNewToOld",
    value: function getAllOfClientFromNewToOld(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query13 = "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY id DESC";
        connection.query(_query13, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientFromOldToNew",
    value: function getAllOfClientFromOldToNew(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY id ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query14 = "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY id ASC";
        connection.query(_query14, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientMostImportant",
    value: function getAllOfClientMostImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY montant DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query15 = "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY montant DESC";
        connection.query(_query15, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientLessImportant",
    value: function getAllOfClientLessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? ORDER BY montant ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query16 = "SELECT * FROM paiement_client WHERE id_client = ? ORDER BY montant ASC";
        connection.query(_query16, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientCIMBENINMostImportant",
    value: function getAllOfClientCIMBENINMostImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query17 = "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant DESC";
        connection.query(_query17, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientCIMBENINLessImportant",
    value: function getAllOfClientCIMBENINLessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query18 = "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY montant ASC";
        connection.query(_query18, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientNOCIBEMostImportant",
    value: function getAllOfClientNOCIBEMostImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY montant DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query19 = "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY montant DESC";
        connection.query(_query19, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientNOCIBELessImportant",
    value: function getAllOfClientNOCIBELessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY montant ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query20 = "SELECT * FROM paiement_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY montant ASC";
        connection.query(_query20, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientUnvalidated",
    value: function getAllOfClientUnvalidated(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND est_valide = 0 ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query21 = "SELECT * FROM paiement_client WHERE id_client = ? AND est_valide = 0 ORDER BY id DESC";
        connection.query(_query21, [id_client], function (error, results) {
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
    }
  }, {
    key: "getAllOfClientValidated",
    value: function getAllOfClientValidated(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM paiement_client WHERE date_paiement BETWEEN ? AND ? AND id_client = ? AND est_valide = 1 ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var paiementsList = results.map(function (paiementData) {
            // console.log(typeof PaiementClientData.quantite_achetee);
            return new PaiementClient(paiementData.id, undefined, paiementData.montant, paiementData.banque, paiementData.reference, paiementData.categorie, paiementData.numero_bc, paiementData.bordereau, paiementData.est_valide, paiementData.id_client, paiementData.date_paiement);
          });
          return callback(null, paiementsList);
        });
      } else {
        var _query22 = "SELECT * FROM paiement_client WHERE id_client = ? AND est_valide = 1 ORDER BY id DESC";
        connection.query(_query22, [id_client], function (error, results) {
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
    }
  }]);

  return PaiementClient;
}();

module.exports = PaiementClient;