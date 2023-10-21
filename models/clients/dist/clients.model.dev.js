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

var Clients =
/*#__PURE__*/
function () {
  function Clients(id, nom, prenoms, numero_ifu, numero_telephone, email, date_ajout) {
    _classCallCheck(this, Clients);

    this.id = id;
    this.nom = nom;
    this.prenoms = prenoms;
    this.numero_ifu = numero_ifu;
    this.numero_telephone = numero_telephone;
    this.email = email;
    this.date_ajout = date_ajout;
  }

  _createClass(Clients, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE clients SET nom = ?, prenoms = ?, numero_ifu = ?, numero_telephone = ?, email = ?, date_ajout = ? WHERE clients.id = ?";

      var id = this.id,
          clientData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [clientData.nom, clientData.prenoms, clientData.numero_ifu, clientData.numero_telephone, clientData.email, new Date(clientData.date_ajout), id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }, {
    key: "delete",
    value: function _delete(callback) {
      var query = "DELETE FROM clients WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(clientData, callback) {
      var query = "INSERT INTO clients (id, nom, prenoms, numero_ifu, numero_telephone, email, date_ajout) VALUES (NULL,?,?,?,?,?,?)";
      var currentDate = new Date();
      console.log("Current date");
      console.log(currentDate);
      connection.query(query, [clientData.nom, clientData.prenoms, clientData.numero_ifu, clientData.numero_telephone, clientData.email, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newClient = _construct(Clients, [results.insertId].concat(_toConsumableArray(Object.values(clientData)), [currentDate]));

        return callback(null, newClient);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM clients WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Client non trouvé
        }

        var clientData = results[0];
        var client = new Clients(clientData.id, clientData.nom, clientData.prenoms, clientData.numero_ifu, clientData.numero_telephone, clientData.email, clientData.date_ajout);
        return callback(null, client);
      });
    }
    /*
    static getAllMatched(name, callback) {
      const query = `SELECT * FROM clients WHERE nom LIKE '%${name}' or nom LIKE '${name}%' or nom LIKE '%${name}%' or prenoms LIKE '%${name}' or prenoms LIKE '${name}%' or prenoms LIKE '%${name}%'`;
      connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
         const clients = results.map((clientData) => {
          return new Clients(
            clientData.id,
            clientData.nom,
            clientData.prenoms,
            clientData.numero_ifu,
            clientData.numero_telephone,
            clientData.email,
            clientData.date_ajout
          );
        });
        return callback(null, clients);
      });
    }
    */

  }, {
    key: "getAllMatched",
    value: function getAllMatched(name, callback) {
      var query = "SELECT * FROM clients WHERE nom LIKE ? OR nom LIKE ? OR nom LIKE ? OR prenoms LIKE ? OR prenoms LIKE ? OR prenoms LIKE ?";
      var searchTerm = "%".concat(name, "%");
      connection.query(query, [searchTerm, "%".concat(name), "".concat(name, "%"), searchTerm, "%".concat(name), "".concat(name, "%")], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var clients = results.map(function (clientData) {
          return new Clients(clientData.id, clientData.nom, clientData.prenoms, clientData.numero_ifu, clientData.numero_telephone, clientData.email, clientData.date_ajout);
        });
        return callback(null, clients);
      });
    } // Méthode pour récupérer toutes les entrées de la table clients

  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT * FROM clients";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var clients = results.map(function (clientData) {
          return new Clients(clientData.id, clientData.nom, clientData.prenoms, clientData.numero_ifu, clientData.numero_telephone, clientData.email, clientData.date_ajout);
        });
        return callback(null, clients);
      });
    }
  }]);

  return Clients;
}();

module.exports = Clients;