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

var Depenses =
/*#__PURE__*/
function () {
  function Depenses(id, description, montant, piece, est_validee, date_depense) {
    _classCallCheck(this, Depenses);

    this.id = id;
    this.description = description;
    this.montant = montant;
    this.piece = piece;
    this.est_validee = est_validee;
    this.date_depense = date_depense;
  }

  _createClass(Depenses, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE depenses SET description = ?, montant = ?, piece = ?, est_validee = ?, date_depense = ? WHERE id = ?";

      var id = this.id,
          updatedData = _objectWithoutProperties(this, ["id"]);

      connection.query(query, [].concat(_toConsumableArray(Object.values(updatedData)), [id]), function (error, results) {
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

      var query = "DELETE FROM depenses WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        return callback(null, _this.id);
      });
    }
  }], [{
    key: "create",
    value: function create(depenseData, callback) {
      var query = "INSERT INTO depenses (id, description, montant, piece, est_validee, date_depense) VALUES (NULL, ?, ?, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newDepense = _construct(Depenses, [results.insertId].concat(_toConsumableArray(Object.values(depenseData)), [currentDate]));

        return callback(null, newDepense);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM depenses WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Dépense non trouvée
        }

        var depenseData = results[0];
        var depense = new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
        return callback(null, depense);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query = "SELECT * FROM depenses ORDER BY id DESC";
        connection.query(_query, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }, {
    key: "getAllFromNewToOld",
    value: function getAllFromNewToOld(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query2 = "SELECT * FROM depenses ORDER BY id DESC";
        connection.query(_query2, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }, {
    key: "getAllFromOldToNew",
    value: function getAllFromOldToNew(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY id ASC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query3 = "SELECT * FROM depenses ORDER BY id ASC";
        connection.query(_query3, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }, {
    key: "getAllMostImportant",
    value: function getAllMostImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY montant DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query4 = "SELECT * FROM depenses ORDER BY montant DESC";
        connection.query(_query4, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }, {
    key: "getAllLessImportant",
    value: function getAllLessImportant(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? ORDER BY montant ASC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query5 = "SELECT * FROM depenses ORDER BY montant ASC";
        connection.query(_query5, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }, {
    key: "getAllValidated",
    value: function getAllValidated(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? AND est_validee = 1 ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query6 = "SELECT * FROM depenses WHERE est_validee = 1 ORDER BY id DESC";
        connection.query(_query6, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }, {
    key: "getAllUnvalidated",
    value: function getAllUnvalidated(startDate, endDate, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM depenses WHERE date_depense BETWEEN ? AND ? AND est_validee = 0 ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate)], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      } else {
        var _query7 = "SELECT * FROM depenses WHERE est_validee = 0 ORDER BY id DESC";
        connection.query(_query7, function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var depensesList = results.map(function (depenseData) {
            return new Depenses(depenseData.id, depenseData.description, depenseData.montant, depenseData.piece, depenseData.est_validee, depenseData.date_depense);
          });
          return callback(null, depensesList);
        });
      }
    }
  }]);

  return Depenses;
}();

module.exports = Depenses;