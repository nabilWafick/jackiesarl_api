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

var StockBonCommande =
/*#__PURE__*/
function () {
  function StockBonCommande(id, numero_bc, categorie, quantite_achetee, stock_initial, stock_avant_vente, vente, stock_apres_vente, date_rechargement) {
    _classCallCheck(this, StockBonCommande);

    this.id = id;
    this.numero_bc = numero_bc;
    this.categorie = categorie;
    this.quantite_achetee = quantite_achetee;
    this.stock_initial = stock_initial, this.stock_avant_vente = stock_avant_vente;
    this.vente = vente;
    this.stock_apres_vente = stock_apres_vente;
    this.date_rechargement = date_rechargement;
  }

  _createClass(StockBonCommande, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE stock_bon_commande SET numero_bc = ?, categorie = ?, quantite_achetee = ?, stock_avant_vente = ?, vente = ?, stock_apres_vente = ?, date_rechargement = ? WHERE id = ?";

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
    value: function create(stockData, callback) {
      var query = "INSERT INTO stock_bon_commande (id, numero_bc, categorie, quantite_achetee, stock_initial,stock_avant_vente, vente, stock_apres_vente, date_rechargement) VALUES (NULL, ?, ?,?, ?, ?, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [stockData.numero_bc, stockData.categorie, stockData.quantite_achetee, stockData.stock_initial, stockData.stock_avant_vente, stockData.vente, stockData.stock_apres_vente, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newStock = _construct(StockBonCommande, [results.insertId].concat(_toConsumableArray(Object.values(stockData)), [currentDate]));

        return callback(null, newStock);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM stock_bon_commande WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Stock de bon de commande non trouvé
        }

        var stockData = results[0];
        var stock = new StockBonCommande(stockData.id, stockData.numero_bc, stockData.categorie, stockData.quantite_achetee, stockData.stock_initial, stockData.stock_avant_vente, stockData.vente, stockData.stock_apres_vente, stockData.date_rechargement);
        return callback(null, stock);
      });
    }
  }, {
    key: "getLastBonCommande",
    value: function getLastBonCommande(bon_commande, callback) {
      var query = "SELECT * FROM stock_bon_commande WHERE numero_bc = ? ORDER BY id DESC LIMIT 1";
      connection.query(query, [bon_commande], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Stock de bon de commande non trouvé
        }

        var stockData = results[0];
        var stock = new StockBonCommande(stockData.id, stockData.numero_bc, stockData.categorie, stockData.quantite_achetee, stockData.stock_initial, stockData.stock_avant_vente, stockData.vente, stockData.stock_apres_vente, stockData.date_rechargement);
        return callback(null, stock);
      });
    }
  }, {
    key: "getByBonCommande",
    value: function getByBonCommande(numero_bc, callback) {
      var query = "SELECT numero_bc, categorie, quantite_achetee, SUM(stock_initial) AS stock_initial, SUM(stock_avant_vente) AS stock_avant_vente ,SUM(vente) AS vente, SUM(stock_apres_vente) AS stock_apres_vente  FROM stock_bon_commande WHERE numero_bc = ?";
      connection.query(query, [numero_bc], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Stock de bon de commande non trouvé
        }

        var stockData = results[0];
        var stock = new StockBonCommande(stockData.id, stockData.numero_bc, stockData.categorie, stockData.quantite_achetee, stockData.stock_initial, stockData.stock_avant_vente, stockData.vente, stockData.stock_apres_vente, stockData.date_rechargement);
        return callback(null, stock);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT * FROM stock_bon_commande ORDER BY numero_bc";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var stocksList = results.map(function (stockData) {
          return new StockBonCommande(stockData.id, stockData.numero_bc, stockData.categorie, stockData.quantite_achetee, stockData.stock_initial, stockData.stock_avant_vente, stockData.vente, stockData.stock_apres_vente, stockData.date_rechargement);
        });
        return callback(null, stocksList);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, callback) {
      var query = "DELETE FROM stock_bon_commande WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error);
        }

        return callback(null);
      });
    }
  }]);

  return StockBonCommande;
}();

module.exports = StockBonCommande;