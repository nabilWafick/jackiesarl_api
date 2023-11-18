const TableBord = require("../../models/table_bord/table_bord.model");

class TableBordController {
  static getWeekDailyPayments(req, res) {
    TableBord.getWeekDailyPayments((error, weekDailyPayments) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération des paiements de la semaine ",
        });
      }
      return res.status(200).json(weekDailyPayments);
    });
  }

  static getWeekDailySales(req, res) {
    TableBord.getWeekDailySales((error, weekDailySales) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération des paiements de la semaine ",
        });
      }
      return res.status(200).json(weekDailySales);
    });
  }

  static getWeekDailySalesQuantity(req, res) {
    TableBord.getWeekDailySalesQuantity((error, weekDailySales) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération des paiements de la semaine ",
        });
      }
      return res.status(200).json(weekDailySales);
    });
  }

  static getDailyRegisteredCustumersTotal(req, res) {
    const isToday = req.params.isToday;

    TableBord.getDailyRegisteredCustumersTotal(
      isToday,
      (error, dailyRegisteredCustumersTotal) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération du nombre de clients inscrits",
          });
        }

        return res.status(200).json(dailyRegisteredCustumersTotal);
      }
    );
  }
  static getDailySalesTotal(req, res) {
    const isToday = req.params.isToday;

    TableBord.getDailySalesTotal(isToday, (error, dailySalesTotal) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error:
            "Erreur lors de la récupération de la vente totale journalière",
        });
      }
      return res.status(200).json(dailySalesTotal);
    });
  }
  static getDailyCompanyPurchases(req, res) {
    const isToday = req.params.isToday;

    TableBord.getDailyCompanyPurchases(
      isToday,
      (error, dailyCompanyPurchases) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération de l'achat journalier de l'entreprise",
          });
        }
        return res.status(200).json(dailyCompanyPurchases);
      }
    );
  }
  static getDailyUntraitedOrdersTotal(req, res) {
    const isToday = req.params.isToday;

    TableBord.getDailyUntraitedOrdersTotal(
      isToday,
      (error, dailyUntraitedOrders) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération des commandes journalières non traitées  ",
          });
        }
        return res.status(200).json(dailyUntraitedOrders);
      }
    );
  }
  static getDailyTraitedOrdersTotal(req, res) {
    const isToday = req.params.isToday;
    TableBord.getDailyTraitedOrdersTotal(
      isToday,
      (error, dailyTraitedOrders) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération des commandes journalières traitées",
          });
        }
        return res.status(200).json(dailyTraitedOrders);
      }
    );
  }
  static getDailyPaymentPerBank(req, res) {
    const isToday = req.params.isToday;

    TableBord.getDailyPaymentTotalPerBank(
      isToday,
      (error, dailyPaymentPerBank) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération des paiements journaliers par banque",
          });
        }
        return res.status(200).json(dailyPaymentPerBank);
      }
    );
  }
  static getDailyPurchasesOrdersStockTotal(req, res) {
    const isToday = req.params.isToday;

    TableBord.getDailyPurchasesOrdersStockTotal(
      isToday,
      (error, dailyPurchasesOrdersStockTotal) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error:
              "Erreur lors de la récupération du stock de bon de commande journalier",
          });
        }
        return res.status(200).json(dailyPurchasesOrdersStockTotal);
      }
    );
  }
  static getDailyAdvancesDebts(req, res) {
    const isToday = req.params.isToday;
    TableBord.getDailyAdvancesDebts(isToday, (error, dailyAdvancesDebts) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error:
            "Erreur lors de la récupération des avance totale et creance totale",
        });
      }
      return res.status(200).json(dailyAdvancesDebts);
    });
  }
}

module.exports = TableBordController;
