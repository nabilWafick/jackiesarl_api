const Commandes = require('../../models/commandes/commandes.model');

class CommandesController {

// Créer une nouvelle commande
static create = (req, res) => {
  const commandeData = req.body;
  Commandes.create(commandeData, (error, commande) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de la commande' });
    }
    return res.status(201).json(commande);
  });
};

// Récupérer une commande par ID
static getById = (req, res) => {
  const id = req.params.id;
  Commandes.getById(id, (error, commande) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
    if (!commande) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    return res.status(200).json(commande);
  });
};


static getAll = (req, res) => {
  Commandes.getAll((error, commandes) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
    }
    return res.status(200).json(commandes);
  });
};


// Mettre à jour une commande par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Commandes.getById(id, (getError, existingCommande) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
    if (!existingCommande) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    existingCommande = { ...existingCommande, ...updatedData };
    existingCommande.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
      }
      return res.status(200).json(existingCommande);
    });
  });
};

// Supprimer une commande par ID
static delete = (req, res) => {
  const id = req.params.id;
  Commandes.getById(id, (getError, existingCommande) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
    }
    if (!existingCommande) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    existingCommande.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
      }
      return res.status(204).end();
    });
  });
};


}


module.exports = CommandesController