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

var RemiseChequeClient =
/*#__PURE__*/
function () {
  function RemiseChequeClient(id, description, banque, montant, reste, est_validee, id_client, date_remise) {
    _classCallCheck(this, RemiseChequeClient);

    this.id = id;
    this.description = description;
    this.banque = banque;
    this.montant = montant;
    this.reste = reste;
    this.est_validee = est_validee;
    this.id_client = id_client;
    this.date_remise = date_remise;
  }

  _createClass(RemiseChequeClient, [{
    key: "update",
    value: function update(callback) {
      var query = "UPDATE remise_cheque_client SET description = ?, banque = ?, montant = ?, reste = ?, est_validee = ?, id_client = ?, date_remise = ? WHERE id = ?";

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

      var query = "DELETE FROM remise_cheque_client WHERE id = ?";
      connection.query(query, [this.id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        return callback(null, _this.id);
      });
    }
  }], [{
    key: "create",
    value: function create(remiseData, callback) {
      var query = "INSERT INTO remise_cheque_client (id, description, banque, montant, reste, est_validee, id_client, date_remise) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
      var currentDate = new Date();
      connection.query(query, [remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, currentDate], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var newRemise = _construct(RemiseChequeClient, [results.insertId].concat(_toConsumableArray(Object.values(remiseData)), [currentDate]));

        return callback(null, newRemise);
      });
    }
  }, {
    key: "getById",
    value: function getById(id, callback) {
      var query = "SELECT * FROM remise_cheque_client WHERE id = ?";
      connection.query(query, [id], function (error, results) {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback(null, null); // Remise de chèque client non trouvée
        }

        var remiseData = results[0];
        var remise = new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
        return callback(null, remise);
      });
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      var query = "SELECT * FROM remise_cheque_client";
      connection.query(query, function (error, results) {
        if (error) {
          return callback(error, null);
        }

        var remisesList = results.map(function (remiseData) {
          return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
        });
        return callback(null, remisesList);
      });
    }
  }, {
    key: "getAllOfClient",
    value: function getAllOfClient(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY id DESC";
        connection.query(_query, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientFromOldToNew",
    value: function getAllOfClientFromOldToNew(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY id ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query2 = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY id ASC";
        connection.query(_query2, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientFromNewToOld",
    value: function getAllOfClientFromNewToOld(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query3 = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY id DESC";
        connection.query(_query3, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientMoreImportant",
    value: function getAllOfClientMoreImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY montant DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query4 = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY montant DESC";
        connection.query(_query4, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientLessImportant",
    value: function getAllOfClientLessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY montant ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query5 = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY montant ASC";
        connection.query(_query5, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientValidated",
    value: function getAllOfClientValidated(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND est_validee = 1 ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query6 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND est_validee = 1 ORDER BY id DESC";
        connection.query(_query6, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientUnvalidated",
    value: function getAllOfClientUnvalidated(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND est_validee = 0 ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query7 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND est_validee = 0 ORDER BY id DESC";
        connection.query(_query7, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientRestLessImportant",
    value: function getAllOfClientRestLessImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY reste ASC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query8 = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY reste ASC";
        connection.query(_query8, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientRestMoreImportant",
    value: function getAllOfClientRestMoreImportant(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? ORDER BY reste DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query9 = "SELECT * FROM remise_cheque_client WHERE id_client = ? ORDER BY reste DESC";
        connection.query(_query9, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientBOABank",
    value: function getAllOfClientBOABank(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'BOA' ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query10 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'BOA' ORDER BY id DESC";
        connection.query(_query10, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientUBABank",
    value: function getAllOfClientUBABank(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'UBA' ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query11 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'UBA' ORDER BY id DESC";
        connection.query(_query11, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientNSIABank",
    value: function getAllOfClientNSIABank(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'NSIA' ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query12 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'NSIA' ORDER BY id DESC";
        connection.query(_query12, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientBGFIBank",
    value: function getAllOfClientBGFIBank(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'BGFI' ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query13 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'BGFI' ORDER BY id DESC";
        connection.query(_query13, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientSGBBank",
    value: function getAllOfClientSGBBank(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'SGB' ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query14 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'SGB' ORDER BY id DESC";
        connection.query(_query14, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }, {
    key: "getAllOfClientEcobankBank",
    value: function getAllOfClientEcobankBank(startDate, endDate, id_client, callback) {
      if (startDate && endDate) {
        var query = "SELECT * FROM remise_cheque_client WHERE date_remise BETWEEN ? AND ? AND id_client = ? AND banque = 'Ecobank' ORDER BY id DESC";
        connection.query(query, [new Date(startDate), new Date(endDate), id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      } else {
        var _query15 = "SELECT * FROM remise_cheque_client WHERE id_client = ? AND banque = 'Ecobank' ORDER BY id DESC";
        connection.query(_query15, [id_client], function (error, results) {
          if (error) {
            return callback(error, null);
          }

          var remisesList = results.map(function (remiseData) {
            return new RemiseChequeClient(remiseData.id, remiseData.description, remiseData.banque, remiseData.montant, remiseData.reste, remiseData.est_validee, remiseData.id_client, remiseData.date_remise);
          });
          return callback(null, remisesList);
        });
      }
    }
  }]);

  return RemiseChequeClient;
}();

module.exports = RemiseChequeClient;