const express = require("express");
const router = express.Router();
const StockCamionController = require("../../controllers/stock_camion/stock_camion.controller");

// Routes pour la table `stock_camion`
router.post("/stock-camion", StockCamionController.create);
router.get("/stock-camion/:id", StockCamionController.getById);
router.get(
  "/stocks-camions-default/:startDate?/:endDate?",
  StockCamionController.getAll
);
router.put("/stock-camion/:id", StockCamionController.update);
router.delete("/stock-camion/:id", StockCamionController.delete);

module.exports = router;
