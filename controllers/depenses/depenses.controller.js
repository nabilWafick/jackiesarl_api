const Depenses = require('../../models/depenses/depenses.model');

class DepensesController{

// Créer une nouvelle dépense
static create = (req, res) => {
  const depenseData = req.body;
  Depenses.create(depenseData, (error, depense) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de la dépense' });
    }
    return res.status(201).json(depense);
  });
};

// Récupérer une dépense par ID
static getById = (req, res) => {
  const id = req.params.id;
  Depenses.getById(id, (error, depense) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la dépense' });
    }
    if (!depense) {
      return res.status(404).json({ error: 'Dépense non trouvée' });
    }
    return res.status(200).json(depense);
  });
};

static getAll = (req, res) => {
  Depenses.getAll((error, depenses) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des dépenses' });
    }
    return res.status(200).json(depenses);
  });
};


// Mettre à jour une dépense par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Depenses.getById(id, (getError, existingDepense) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la dépense' });
    }
    if (!existingDepense) {
      return res.status(404).json({ error: 'Dépense non trouvée' });
    }
    existingDepense = { ...existingDepense, ...updatedData };
    existingDepense.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de la dépense' });
      }
      return res.status(200).json(existingDepense);
    });
  });
};

// Supprimer une dépense par ID
static delete = (req, res) => {
  const id = req.params.id;
  Depenses.getById(id, (getError, existingDepense) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la dépense' });
    }
    if (!existingDepense) {
      return res.status(404).json({ error: 'Dépense non trouvée' });
    }
    existingDepense.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de la dépense' });
      }
      return res.status(204).end();
    });
  });
};


}


module.exports = DepensesController