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

var Commandes =
/*#__PURE__*/
function () {
  function Commandes(id, client, categorie, quantite_achetee, destination, date_commande, date_livraison, est_traitee, id_client, date_ajout) {
    _classCallCheck(this, Commandes);

    this.id = id;
    this.client = client;
    this.categorie = categorie;
    this.quantite_achetee = quantite_achetee;
    this.destination = destination;
    this.date_commande = date_commande;
    this.date_livraison = date_livraison;
    this.est_traitee = est_traitee;
    this.id_client = id_client;
    this.date_ajout = date_ajout;
  }

  _createClass(Commandes, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE commandes SET categorie = ?, quantite_achetee = ?, destination = ?, date_commande = ?, date_livraison = ?, est_traitee = ?, id_client = ?, date_ajout = ? WHERE id = ?";

      var id = this.id,
          commandeData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, new Date(commandeData.date_commande), new Date(commandeData.date_livraison), commandeData.est_traitee, commandeData.id_client, new Date(commandeData.date_ajout), id], function (error, results) {
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

      var query = "DELETE FROM commandes WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        return callback(null, _this.id);
      });
    }
  }], [{
    key: "create",
    value: function create(commandeData, callback) {
      var query = "INSERT INTO commandes (id, categorie, quantite_achetee, destination, date_commande, date_livraison, est_traitee, id_client, date_ajout) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, new Date(commandeData.date_commande), new Date(commandeData.date_livraison), commandeData.est_traitee, commandeData.id_client, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newCommande = _construct(Commandes, [results.insertId, undefined].concat(_toConsumableArray(Object.values(commandeData))));

        return callback(null, newCommande);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM commandes WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Commande non trouvée
        }

        var commandeData = results[0];
        var commande = new Commandes(commandeData.id, undefined, commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
        return callback(null, commande);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? ORDER BY commandes.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client ORDER BY commandes.id DESC ;";
        connection.query(_query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllFromNewToOld",
    value: function getAllFromNewToOld(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? ORDER BY commandes.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query2 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client ORDER BY commandes.id DESC ;";
        connection.query(_query2, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllFromOldToNew",
    value: function getAllFromOldToNew(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? ORDER BY commandes.id ASC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query3 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client ORDER BY commandes.id ASC ;";
        connection.query(_query3, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllMoreImportant",
    value: function getAllMoreImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? ORDER BY commandes.quantite_achetee DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query4 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client ORDER BY commandes.quantite_achetee DESC ;";
        connection.query(_query4, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllLessImportant",
    value: function getAllLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? ORDER BY commandes.quantite_achetee ASC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query5 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client ORDER BY commandes.quantite_achetee ASC ;";
        connection.query(_query5, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllNOCIBEMoreImportant",
    value: function getAllNOCIBEMoreImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? AND commandes.categorie = 'NOCIBE' ORDER BY commandes.quantite_achetee DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query6 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client AND commandes.categorie = 'NOCIBE' ORDER BY commandes.quantite_achetee DESC ;";
        connection.query(_query6, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllNOCIBELessImportant",
    value: function getAllNOCIBELessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? AND commandes.categorie = 'NOCIBE' ORDER BY commandes.quantite_achetee  ASC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query7 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client AND commandes.categorie = 'NOCIBE' ORDER BY commandes.quantite_achetee ASC ;";
        connection.query(_query7, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllCIMBENINMoreImportant",
    value: function getAllCIMBENINMoreImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? AND commandes.categorie = 'CIM BENIN' ORDER BY commandes.quantite_achetee  DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query8 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client AND commandes.categorie = 'CIM BENIN' ORDER BY commandes.quantite_achetee DESC ;";
        connection.query(_query8, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllCIMBENINLessImportant",
    value: function getAllCIMBENINLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\n    FROM\n    clients, commandes \n    WHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? AND commandes.categorie = 'CIM BENIN' ORDER BY commandes.quantite_achetee ASC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query9 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client AND commandes.categorie = 'CIM BENIN' ORDER BY commandes.quantite_achetee  ASC ;";
        connection.query(_query9, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllGroupByDestination",
    value: function getAllGroupByDestination(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? GROUP BY commandes.destination ORDER BY commandes.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query10 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client GROUP BY commandes.destination ORDER BY commandes.id DESC ;";
        connection.query(_query10, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllDelivered",
    value: function getAllDelivered(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ? AND commandes.est_traitee = 1 ORDER BY commandes.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query11 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client AND commandes.est_traitee = 1 ORDER BY commandes.id DESC ;";
        connection.query(_query11, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }, {
    key: "getAllUnDelivered",
    value: function getAllUnDelivered(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT\n    clients.id AS id_client,\n    clients.nom,\n    clients.prenoms,\n    clients.numero_ifu,\n    clients.numero_telephone,\n    clients.email,\n    clients.date_ajout AS date_ajout_client,\n    commandes.id AS id_commande,\n    commandes.categorie,\n    commandes.quantite_achetee,\n    commandes.destination,\n    commandes.date_commande,\n    commandes.date_livraison,\n    commandes.est_traitee,\n    commandes.id_client,\n    commandes.date_ajout\nFROM\n    clients, commandes \nWHERE\n    clients.id = commandes.id_client AND commandes.date_ajout BETWEEN ? AND ?  AND commandes.est_traitee = 0 ORDER BY commandes.id DESC ;";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      } else {
        var _query12 = "SELECT\n      clients.id AS id_client,\n      clients.nom,\n      clients.prenoms,\n      clients.numero_ifu,\n      clients.numero_telephone,\n      clients.email,\n      clients.date_ajout AS date_ajout_client,\n      commandes.id AS id_commande,\n      commandes.categorie,\n      commandes.quantite_achetee,\n      commandes.destination,\n      commandes.date_commande,\n      commandes.date_livraison,\n      commandes.est_traitee,\n      commandes.id_client,\n      commandes.date_ajout\n  FROM\n      clients, commandes \n  WHERE\n      clients.id = commandes.id_client AND commandes.est_traitee = 0 ORDER BY commandes.id DESC ;";
        connection.query(_query12, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var commandes = results.map(function (commandeData) {
            return new Commandes(commandeData.id_commande, new Clients(commandeData.id_client, commandeData.nom, commandeData.prenoms, commandeData.numero_ifu, commandeData.numero_telephone, commandeData.email, commandeData.date_ajout_client), commandeData.categorie, commandeData.quantite_achetee, commandeData.destination, commandeData.date_commande, commandeData.date_livraison, commandeData.est_traitee, commandeData.id_client, commandeData.date_ajout);
          });
          return callback(null, commandes);
        });
      }
    }
  }]);

  return Commandes;
}();

module.exports = Commandes;