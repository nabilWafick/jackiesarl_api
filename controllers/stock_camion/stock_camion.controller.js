const StockCamion = require('../../models/stock_camion/stock_camion.model');


class StockCamionController {

// Créer un nouveau stock camion
static create = (req, res) => {
  const stockCamionData = req.body;
  StockCamion.create(stockCamionData, (error, stockCamion) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création du stock camion' });
    }
    return res.status(201).json(stockCamion);
  });
};

// Récupérer un stock camion par ID
static getById = (req, res) => {
  const id = req.params.id;
  StockCamion.getById(id, (error, stockCamion) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du stock camion' });
    }
    if (!stockCamion) {
      return res.status(404).json({ error: 'Stock camion non trouvé' });
    }
    return res.status(200).json(stockCamion);
  });
};

static getAll = (req, res) => {
  StockCamion.getAll((error, stockCamions) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des stocks de camion' });
    }
    return res.status(200).json(stockCamions);
  });
};


// Mettre à jour un stock camion par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  StockCamion.getById(id, (getError, existingStockCamion) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du stock camion' });
    }
    if (!existingStockCamion) {
      return res.status(404).json({ error: 'Stock camion non trouvé' });
    }
    existingStockCamion = { ...existingStockCamion, ...updatedData };
    existingStockCamion.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du stock camion' });
      }
      return res.status(200).json(existingStockCamion);
    });
  });
};

// Supprimer un stock camion par ID
static delete = (req, res) => {
  const id = req.params.id;
  StockCamion.getById(id, (getError, existingStockCamion) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du stock camion' });
    }
    if (!existingStockCamion) {
      return res.status(404).json({ error: 'Stock camion non trouvé' });
    }
    existingStockCamion.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression du stock camion' });
      }
      return res.status(204).end();
    });
  });
};


}


module.exports=StockCamionController