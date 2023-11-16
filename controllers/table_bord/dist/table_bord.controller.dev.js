"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TableBord = require("../../models/table_bord/table_bord.model");

var TableBordController =
/*#__PURE__*/
function () {
  function TableBordController() {
    _classCallCheck(this, TableBordController);
  }

  _createClass(TableBordController, null, [{
    key: "getWeekDailyPayments",
    value: function getWeekDailyPayments(req, res) {
      TableBord.getWeekDailyPayments(function (error, weekDailyPayments) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération des paiements de la semaine "
          });
        }

        return res.status(200).json(weekDailyPayments);
      });
    }
  }, {
    key: "getWeekDailySales",
    value: function getWeekDailySales(req, res) {
      TableBord.getWeekDailySales(function (error, weekDailyPayments) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération des paiements de la semaine "
          });
        }

        return res.status(200).json(weekDailyPayments);
      });
    }
  }, {
    key: "getDailyRegisteredCustumersTotal",
    value: function getDailyRegisteredCustumersTotal(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyRegisteredCustumersTotal(isToday, function (error, dailyRegisteredCustumersTotal) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération du nombre de clients inscrits"
          });
        }

        return res.status(200).json(dailyRegisteredCustumersTotal);
      });
    }
  }, {
    key: "getDailySalesTotal",
    value: function getDailySalesTotal(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailySalesTotal(isToday, function (error, dailySalesTotal) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de la vente totale journalière"
          });
        }

        return res.status(200).json(dailySalesTotal);
      });
    }
  }, {
    key: "getDailyCompanyPurchases",
    value: function getDailyCompanyPurchases(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyCompanyPurchases(isToday, function (error, dailyCompanyPurchases) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération de l'achat journalier de l'entreprise"
          });
        }

        return res.status(200).json(dailyCompanyPurchases);
      });
    }
  }, {
    key: "getDailyUntraitedOrdersTotal",
    value: function getDailyUntraitedOrdersTotal(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyUntraitedOrdersTotal(isToday, function (error, dailyUntraitedOrders) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération des commandes journalières non traitées  "
          });
        }

        return res.status(200).json(dailyUntraitedOrders);
      });
    }
  }, {
    key: "getDailyTraitedOrdersTotal",
    value: function getDailyTraitedOrdersTotal(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyTraitedOrdersTotal(isToday, function (error, dailyTraitedOrders) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération des commandes journalières traitées"
          });
        }

        return res.status(200).json(dailyTraitedOrders);
      });
    }
  }, {
    key: "getDailyPaymentPerBank",
    value: function getDailyPaymentPerBank(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyPaymentTotalPerBank(isToday, function (error, dailyPaymentPerBank) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération des paiements journaliers par banque"
          });
        }

        return res.status(200).json(dailyPaymentPerBank);
      });
    }
  }, {
    key: "getDailyPurchasesOrdersStockTotal",
    value: function getDailyPurchasesOrdersStockTotal(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyPurchasesOrdersStockTotal(isToday, function (error, dailyPurchasesOrdersStockTotal) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération du stock de bon de commande journalier"
          });
        }

        return res.status(200).json(dailyPurchasesOrdersStockTotal);
      });
    }
  }, {
    key: "getDailyAdvancesDebts",
    value: function getDailyAdvancesDebts(req, res) {
      var isToday = req.params.isToday;
      TableBord.getDailyAdvancesDebts(isToday, function (error, dailyAdvancesDebts) {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la récupération des avance totale et creance totale"
          });
        }

        return res.status(200).json(dailyAdvancesDebts);
      });
    }
  }]);

  return TableBordController;
}();

module.exports = TableBordController;