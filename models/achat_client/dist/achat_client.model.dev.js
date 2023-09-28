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

var connection = require('../_db/database'); // Modèle de données pour la table achat_client


var AchatClient =
/*#__PURE__*/
function () {
  function AchatClient(id, quantiteAchetee, categorie, montant, numeroCtp, bordereau, numeroBc, idClient, dateAchat) {
    _classCallCheck(this, AchatClient);

    this.id = id;
    this.quantiteAchetee = quantiteAchetee;
    this.categorie = categorie;
    this.montant = montant;
    this.numeroCtp = numeroCtp;
    this.bordereau = bordereau;
    this.numeroBc = numeroBc;
    this.idClient = idClient;
    this.dateAchat = dateAchat;
  } // Méthode pour créer un nouvel achat client


  _createClass(AchatClient, [{
    key: "update",
    // Méthode pour mettre à jour un achat client
    value: function update(callback) {
      var query = 'UPDATE achat_client SET ? WHERE id = ?';

      var id = this.id,
          achatClientData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [achatClientData, id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    } // Méthode pour supprimer un achat client

  }, {
    key: "delete",
    value: function _delete(callback) {
      var query = 'DELETE FROM achat_client WHERE id = ?';
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    } // Autres méthodes pour effectuer des opérations CRUD sur la table achat_client

  }], [{
    key: "create",
    value: function create(achatClientData, callback) {
      var query = 'INSERT INTO achat_client SET ?';
      connection.query(query, achatClientData, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newAchatClient = _construct(AchatClient, [results.insertId].concat(_toConsumableArray(Object.values(achatClientData))));

        return callback(null, newAchatClient);
      });
    } // Méthode pour récupérer un achat client par ID

  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = 'SELECT * FROM achat_client WHERE id = ?';
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Achat client non trouvé
        }

        var achatClientData = results[0];
        var achatClient = new AchatClient(achatClientData.id, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, achatClientData.date_achat);
        return callback(null, achatClient);
      });
    } // Méthode pour récupérer tous les achats clients

  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM achat_client';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var achatsClients = results.map(function (achatClientData) {
          return new AchatClient(achatClientData.id, achatClientData.quantite_achetee, achatClientData.categorie, achatClientData.montant, achatClientData.numero_ctp, achatClientData.bordereau, achatClientData.numero_bc, achatClientData.id_client, achatClientData.date_achat);
        });
        return callback(null, achatsClients);
      });
    }
  }]);

  return AchatClient;
}();

module.exports = AchatClient;