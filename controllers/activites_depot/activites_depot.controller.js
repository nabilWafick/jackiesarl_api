const ActivitesDepot = require('../../models/activites_depot/activites_depot.model');


class ActivitesDepotController{

// Créer une nouvelle activité dépôt
static create = (req, res) => {
  const activiteDepotData = req.body;
  ActivitesDepot.create(activiteDepotData, (error, activiteDepot) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'activité dépôt' });
    }
    return res.status(201).json(activiteDepot);
  });
};

// Récupérer une activité dépôt par ID
static getById = (req, res) => {
  const id = req.params.id;
  ActivitesDepot.getById(id, (error, activiteDepot) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'activité dépôt' });
    }
    if (!activiteDepot) {
      return res.status(404).json({ error: 'Activité dépôt non trouvée' });
    }
    return res.status(200).json(activiteDepot);
  });
};

static getAll = (req, res) => {
  ActivitesDepot.getAll((error, activitesDepot) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des activités depot' });
    }
    return res.status(200).json(activitesDepot);
  });
};


// Mettre à jour une activité dépôt par ID
static update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  ActivitesDepot.getById(id, (getError, existingActiviteDepot) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'activité dépôt' });
    }
    if (!existingActiviteDepot) {
      return res.status(404).json({ error: 'Activité dépôt non trouvée' });
    }
    existingActiviteDepot = { ...existingActiviteDepot, ...updatedData };
    existingActiviteDepot.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'activité dépôt' });
      }
      return res.status(200).json(existingActiviteDepot);
    });
  });
};

// Supprimer une activité dépôt par ID
static delete = (req, res) => {
  const id = req.params.id;
  ActivitesDepot.getById(id, (getError, existingActiviteDepot) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'activité dépôt' });
    }
    if (!existingActiviteDepot) {
      return res.status(404).json({ error: 'Activité dépôt non trouvée' });
    }
    existingActiviteDepot.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de l\'activité dépôt' });
      }
      return res.status(204).end();
    });
  });
};
}

module.exports = ActivitesDepotController