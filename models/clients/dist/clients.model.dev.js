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

var Clients =
/*#__PURE__*/
function () {
  function Clients(id, nomComplet, numeroIfu, numeroTelephone, email) {
    _classCallCheck(this, Clients);

    this.id = id;
    this.nomComplet = nomComplet;
    this.numeroIfu = numeroIfu;
    this.numeroTelephone = numeroTelephone;
    this.email = email;
  }

  _createClass(Clients, [{
    key: "update",
    value: function update(callback) {
      var query = 'UPDATE clients SET ? WHERE id = ?';

      var id = this.id,
          clientData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [clientData, id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(clientData, callback) {
      var query = 'INSERT INTO clients SET ?';
      connection.query(query, clientData, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newClient = _construct(Clients, [results.insertId].concat(_toConsumableArray(Object.values(clientData))));

        return callback(null, newClient);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = 'SELECT * FROM clients WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Client non trouvé
        }

        var clientData = results[0];
        var client = new Clients(clientData.id, clientData.nom_complet, clientData.numero_ifu, clientData.numero_telephone, clientData.email);
        return callback(null, client);
      });
    } // Méthode pour récupérer toutes les entrées de la table clients

  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM clients';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var clients = results.map(function (clientData) {
          return new Clients(clientData.id, clientData.nom_complet, clientData.numero_ifu, clientData.numero_telephone, clientData.email);
        });
        return callback(null, clients);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(id, callback) {
      var query = 'DELETE FROM clients WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return Clients;
}();

module.exports = Clients;