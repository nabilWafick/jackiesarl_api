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

var AchatClient =
/*#__PURE__*/
function () {
  function AchatClient(id, client, quantite_achetee, categorie, montant, numero_ctp, bordereau, numero_bc, id_client, date_achat) {
    _classCallCheck(this, AchatClient);

    this.id = id;
    this.client = client;
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
      var _this = this;

      var query = "DELETE FROM achat_client WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        return callback(null, _this.id);
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
        var achatClient = new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
        return callback(null, achatClient);
      });
    } // ================ All Client ================

  }, {
    key: "getAll",
    value: function getAll(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\n    FROM clients, achat_client\n    WHERE achat_client.date_achat BETWEEN ? AND ? AND\n    clients.id = achat_client.id_client\n    ORDER BY achat_client.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\n     clients.id = achat_client.id_client ORDER BY achat_client.id DESC;";
        connection.query(_query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllFromNewToOld",
    value: function getAllFromNewToOld(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query2 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\n     clients.id = achat_client.id_client ORDER BY achat_client.id DESC;";
        connection.query(_query2, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllFromOldToNew",
    value: function getAllFromOldToNew(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.id ASC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query3 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\n     clients.id = achat_client.id_client ORDER BY achat_client.id ASC;";
        connection.query(_query3, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllMostImportant",
    value: function getAllMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query4 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC;";
        connection.query(_query4, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllLessImportant",
    value: function getAllLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query5 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC;";
        connection.query(_query5, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllNOCIBEMostImportant",
    value: function getAllNOCIBEMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'NOCIBE' AND\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query6 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client\nWHERE achat_client.categorie = 'NOCIBE' AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC";
        connection.query(_query6, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllNOCIBELessImportant",
    value: function getAllNOCIBELessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'NOCIBE' AND\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query7 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'NOCIBE' AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC";
        connection.query(_query7, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllCIMBENINMostImportant",
    value: function getAllCIMBENINMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'CIM BENIN' AND\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query8 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'CIM BENIN' AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee DESC";
        connection.query(_query8, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllCIMBENINLessImportant",
    value: function getAllCIMBENINLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'CIM BENIN' AND\nachat_client.date_achat BETWEEN ? AND ? AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query9 = "SELECT\n    clients.id AS client_id,\n    clients.nom AS nom,\n    clients.prenoms AS prenoms,\n    clients.numero_ifu AS numero_ifu,\n    clients.numero_telephone AS numero_telephone,\n    clients.email AS email,\n    clients.date_ajout AS date_ajout,\n    achat_client.id AS achat_id,\n    achat_client.quantite_achetee,\n    achat_client.categorie AS categorie,\n    achat_client.montant AS montant,\n    achat_client.numero_ctp AS numero_ctp,\n    achat_client.bordereau AS bordereau,\n    achat_client.numero_bc AS numero_bc,\n    achat_client.date_achat AS date_achat\nFROM\n    clients\n, achat_client \nWHERE achat_client.categorie = 'CIM BENIN' AND\n     clients.id = achat_client.id_client ORDER BY achat_client.quantite_achetee ASC";
        connection.query(_query9, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            return new AchatClient(achatClientData.achat_id, new Clients(achatClientData.client_id, achatClientData.nom, achatClientData.prenoms, achatClientData.numero_ifu, achatClientData.numero_telephone, achatClientData.email, achatClientData.date_ajout), achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    } // =========== Defined Client ========

  }, {
    key: "getAllOfClient",
    value: function getAllOfClient(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query10 = "SELECT * FROM achat_client WHERE id_client = ? ORDER BY id DESC";
        connection.query(_query10, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientFromNewToOld",
    value: function getAllOfClientFromNewToOld(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query11 = "SELECT * FROM achat_client WHERE id_client = ? ORDER BY id DESC";
        connection.query(_query11, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientFromOldToNew",
    value: function getAllOfClientFromOldToNew(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY id ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query12 = "SELECT * FROM achat_client WHERE id_client = ? ORDER BY id ASC";
        connection.query(_query12, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientMostImportant",
    value: function getAllOfClientMostImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY quantite_achetee DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query13 = "SELECT * FROM achat_client WHERE id_client = ? ORDER BY quantite_achetee DESC";
        connection.query(_query13, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientLessImportant",
    value: function getAllOfClientLessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? ORDER BY quantite_achetee ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query14 = "SELECT * FROM achat_client WHERE id_client = ? ORDER BY quantite_achetee ASC";
        connection.query(_query14, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientCIMBENINMostImportant",
    value: function getAllOfClientCIMBENINMostImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query15 = "SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee DESC";
        connection.query(_query15, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientCIMBENINLessImportant",
    value: function getAllOfClientCIMBENINLessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query16 = "SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'CIM BENIN' ORDER BY quantite_achetee ASC";
        connection.query(_query16, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientNOCIBEMostImportant",
    value: function getAllOfClientNOCIBEMostImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query17 = "SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee DESC";
        connection.query(_query17, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }, {
    key: "getAllOfClientNOCIBELessImportant",
    value: function getAllOfClientNOCIBELessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM achat_client WHERE date_achat BETWEEN ? AND ? AND id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      } else {
        var _query18 = "SELECT * FROM achat_client WHERE id_client = ? AND categorie = 'NOCIBE' ORDER BY quantite_achetee ASC";
        connection.query(_query18, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var achatsClients = results.map(function (achatClientData) {
            // console.log(typeof achatClientData.quantite_achetee);
            return new AchatClient(achatClientData.id, undefined, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.client_id, new Date(achatClientData.date_achat));
          });
          return callback(null, achatsClients);
        });
      }
    }
  }]);

  return AchatClient;
}();

module.exports = AchatClient;