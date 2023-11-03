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

var Employes =
/*#__PURE__*/
function () {
  function Employes(id, nom, prenoms, email, numero_telephone, password, role, permissions, token, date_ajout) {
    _classCallCheck(this, Employes);

    this.id = id;
    this.nom = nom;
    this.prenoms = prenoms;
    this.email = email;
    this.numero_telephone = numero_telephone;
    this.password = password;
    this.role = role;
    this.permissions = permissions, this.token = token;
    this.date_ajout = date_ajout;
  }

  _createClass(Employes, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE employes SET nom = ?, prenoms = ?, email = ?, password = ?, role = ?, permissions = ?,token = ?, date_ajout = ? WHERE id = ?";

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [].concat(_toConsumableArray(Object.values(updatedData)), [id]), function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }], [{
    key: "create",
    value: function create(employeData, callback) {
      var employeeDefaultPermissions = {
        admin: false,
        "lire-tableau-bord": true,
        "imprimer-interface": false,
        "ajouter-client": false,
        "lire-client": false,
        "modifier-client": false,
        "supprimer-client": false,
        "lire-solde-client": false,
        "lire-avances-clients": false,
        "lire-creances-clients": false,
        "ajouter-achat-client": false,
        "lire-achat-client": false,
        "modifier-achat-client": false,
        "supprimer-achat-client": false,
        "ajouter-paiement-client": false,
        "lire-paiement-client": false,
        "modifier-paiement-client": false,
        "supprimer-paiement-client": false,
        "ajouter-remise-cheque-client": false,
        "lire-remise-cheque-client": false,
        "modifier-remise-cheque-client": false,
        "supprimer-remise-cheque-client": false,
        "ajouter-stock-bon-commande": false,
        "lire-stock-bon-commande": false,
        "modifier-stock-bon-commande": false,
        "supprimer-stock-bon-commande": false,
        "ajouter-stock-camion": false,
        "lire-stock-camion": false,
        "modifier-stock-camion": false,
        "supprimer-stock-camion": false,
        "ajouter-achat-entreprise": false,
        "lire-achat-entreprise": false,
        "modifier-achat-entreprise": false,
        "supprimer-achat-entreprise": false,
        "ajouter-modification": false,
        "lire-modification": false,
        "modifier-modification": false,
        "supprimer-modification": false,
        "ajouter-brouillard": false,
        "lire-brouillard": false,
        "modifier-brouillard": false,
        "supprimer-brouillard": false,
        "ajouter-activite-depot": false,
        "lire-activite-depot": false,
        "modifier-activite-depot": false,
        "supprimer-activite-depot": false,
        "ajouter-depense": false,
        "lire-depense": false,
        "modifier-depense": false,
        "supprimer-depense": false,
        "ajouter-rapport": false,
        "lire-rapport": false,
        "modifier-rapport": false,
        "supprimer-rapport": false,
        "ajouter-commande": false,
        "lire-commande": false,
        "modifier-commande": false,
        "supprimer-commande": false,
        "ajouter-solde-courant": false,
        "lire-solde-courant": false,
        "modifier-solde-courant": false,
        "supprimer-solde-courant": false,
        "ajouter-activite-banque": false,
        "lire-activite-banque": false,
        "modifier-activite-banque": false,
        "supprimer-activite-banque": false
      };
      var query = "INSERT INTO employes (id, nom, prenoms, email, numero_telephone, password, role, permissions, token, date_ajout) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?,?)"; //  console.log("employeeDefaultPermissions", employeeDefaultPermissions);

      connection.query(query, [employeData.nom, employeData.prenoms, employeData.email, employeData.numero_telephone, employeData.password, employeData.role, JSON.stringify(employeeDefaultPermissions), employeData.token, new Date()], function (error, results) {
        if (error) {
          console.log(error);
          return callback(error, null);
        }

        var newEmploye = _construct(Employes, [results.insertId].concat(_toConsumableArray(Object.values(employeData)), ["User Token", new Date()]));

        return callback(null, newEmploye);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM employes WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Employé non trouvé
        }

        var employeData = results[0];
        var employe = new Employes(employeData.id, employeData.nom, employeData.prenoms, employeData.email, employeData.numero_telephone, employeData.password, employeData.role, employeData.permissions, employeData.token, employeData.date_ajout);
        return callback(null, employe);
      });
    }
  }, {
    key: "getByEmail",
    value: function getByEmail(email, callback) {
      var query = "SELECT * FROM employes WHERE email = ?";
      connection.query(query, [email], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Employé non trouvé
        }

        var employeData = results[0];
        var employe = new Employes(employeData.id, employeData.nom, employeData.prenoms, employeData.email, employeData.numero_telephone, employeData.password, employeData.role, employeData.permissions, employeData.token, employeData.date_ajout);
        return callback(null, employe);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT * FROM employes";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var employesList = results.map(function (employeData) {
          return new Employes(employeData.id, employeData.nom, employeData.prenoms, employeData.email, employeData.numero_telephone, employeData.password, employeData.permissions, employeData.token, employeData.date_ajout);
        });
        return callback(null, employesList);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      var query = "DELETE FROM employes WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return Employes;
}();

module.exports = Employes;