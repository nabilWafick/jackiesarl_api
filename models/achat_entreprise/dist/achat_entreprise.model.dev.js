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

var connection = require('../_db/database'); // Modèle de données pour la table achat_entreprise


var AchatEntreprise =
/*#__PURE__*/
function () {
  function AchatEntreprise(bonCommande, quantiteAchetee, montant, banque, cheque, bordereau, dateAchat) {
    _classCallCheck(this, AchatEntreprise);

    this.bonCommande = bonCommande;
    this.quantiteAchetee = quantiteAchetee;
    this.montant = montant;
    this.banque = banque;
    this.cheque = cheque;
    this.bordereau = bordereau;
    this.dateAchat = dateAchat;
  } // Méthode pour créer un nouvel achat entreprise


  _createClass(AchatEntreprise, [{
    key: "update",
    // Méthode pour mettre à jour un achat entreprise
    value: function update(callback) {
      var query = 'UPDATE achat_entreprise SET ? WHERE bon_commande = ?';

      var bonCommande = this.bonCommande,
          achatEntrepriseData = _objectWithoutProperties(this, ["bonCommande"]);

      connection.query(query, [achatEntrepriseData, bonCommande], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    } // Méthode pour supprimer un achat entreprise par bon de commande

  }], [{
    key: "create",
    value: function create(achatEntrepriseData, callback) {
      var query = 'INSERT INTO achat_entreprise SET ?';
      connection.query(query, achatEntrepriseData, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newAchatEntreprise = _construct(AchatEntreprise, [results.insertId].concat(_toConsumableArray(Object.values(achatEntrepriseData))));

        return callback(null, newAchatEntreprise);
      });
    } // Méthode pour récupérer un achat entreprise par bon de commande

  }, {
    key: "getByBonCommande",
    value: function getByBonCommande(bonCommande, callback) {
      var query = 'SELECT * FROM achat_entreprise WHERE bon_commande = ?';
      connection.query(query, [bonCommande], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Achat entreprise non trouvé
        }

        var achatEntrepriseData = results[0];
        var achatEntreprise = new AchatEntreprise(achatEntrepriseData.bon_commande, achatEntrepriseData.quantite_achetee, achatEntrepriseData.montant, achatEntrepriseData.banque, achatEntrepriseData.cheque, achatEntrepriseData.bordereau, achatEntrepriseData.date_achat);
        return callback(null, achatEntreprise);
      });
    } // Méthode pour récupérer toutes les entrées de la table achat_entreprise

  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = 'SELECT * FROM achat_entreprise';
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var achatsEntreprise = results.map(function (achatEntrepriseData) {
          return new AchatEntreprise(achatEntrepriseData.bon_commande, achatEntrepriseData.quantite_achetee, achatEntrepriseData.montant, achatEntrepriseData.banque, achatEntrepriseData.cheque, achatEntrepriseData.bordereau, achatEntrepriseData.date_achat);
        });
        return callback(null, achatsEntreprise);
      });
    }
  }, {
    key: "deleteByBonCommande",
    value: function deleteByBonCommande(bonCommande, callback) {
      var query = 'DELETE FROM achat_entreprise WHERE bon_commande = ?';
      connection.query(query, [bonCommande], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    } // Autres méthodes pour effectuer des opérations CRUD sur la table achat_entreprise

  }]);

  return AchatEntreprise;
}();

module.exports = AchatEntreprise;