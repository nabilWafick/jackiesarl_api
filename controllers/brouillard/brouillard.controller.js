const Brouillard = require('../../models/brouillard/brouillard.model');


class BrouillardController{
// Créer un nouveau brouillard
static create = (req, res) => {
  const brouillardData = req.body;
  Brouillard.create(brouillardData, (error, brouillard) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création du brouillard' });
    }
    return res.status(201).json(brouillard);
  });
};

// Récupérer un brouillard par ID
static getById = (req, res) => {
  const id = req.params.id;
  Brouillard.getById(id, (error, brouillard) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du brouillard' });
    }
    if (!brouillard) {
      return res.status(404).json({ error: 'Brouillard non trouvé' });
    }
    return res.status(200).json(brouillard);
  });
};

static getAll = (req, res) => {
  Brouillard.getAll((error, brouillards) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des brouillards' });
    }
    return res.status(200).json(brouillards);
  });
};


// Mettre à jour un brouillard par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Brouillard.getById(id, (getError, existingBrouillard) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du brouillard' });
    }
    if (!existingBrouillard) {
      return res.status(404).json({ error: 'Brouillard non trouvé' });
    }
    existingBrouillard = { ...existingBrouillard, ...updatedData };
    existingBrouillard.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du brouillard' });
      }
      return res.status(200).json(existingBrouillard);
    });
  });
};

// Supprimer un brouillard par ID
static delete = (req, res) => {
  const id = req.params.id;
  Brouillard.getById(id, (getError, existingBrouillard) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du brouillard' });
    }
    if (!existingBrouillard) {
      return res.status(404).json({ error: 'Brouillard non trouvé' });
    }
    existingBrouillard.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression du brouillard' });
      }
      return res.status(204).end();
    });
  });
};
}


module.exports = BrouillardController