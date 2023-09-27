const AchatEntreprise = require('../../models/achat_entreprise/achat_entreprise.model');


class AchatEntrepriseController{


// Créer un nouvel achat entreprise
static create = (req, res) => {
  const achatEntrepriseData = req.body;
  AchatEntreprise.create(achatEntrepriseData, (error, achatEntreprise) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la création de l\'achat entreprise' });
    }
    return res.status(201).json(achatEntreprise);
  });
};

// Récupérer un achat entreprise par ID
static getByBonCommande = (req, res) => {
  const bonCommande = req.params.bon_commande;
  AchatEntreprise.getById(bonCommande, (error, achatEntreprise) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'achat entreprise' });
    }
    if (!achatEntreprise) {
      return res.status(404).json({ error: 'Achat entreprise non trouvé' });
    }
    return res.status(200).json(achatEntreprise);
  });
};

static getAll = (req, res) => {
  AchatEntreprise.getAll((error, achatsEntreprise) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des achats entreprise' });
    }
    return res.status(200).json(achatsEntreprise);
  });
};


// Mettre à jour un achat entreprise par bon de commande
static update = (req, res) => {
  const bonCommande = req.params.bon_commande;
  const updatedData = req.body;
  AchatEntreprise.getById(bonCommande, (getError, existingAchatEntreprise) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'achat entreprise' });
    }
    if (!existingAchatEntreprise) {
      return res.status(404).json({ error: 'Achat entreprise non trouvé' });
    }
    existingAchatEntreprise = { ...existingAchatEntreprise, ...updatedData };
    existingAchatEntreprise.update((updateError) => {
      if (updateError) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'achat entreprise' });
      }
      return res.status(200).json(existingAchatEntreprise);
    });
  });
};

// Supprimer un achat entreprise par bon de commande
static delete = (req, res) => {
  const bonCommande = req.params.bon_commande;
  AchatEntreprise.getById(bonCommande, (getError, existingAchatEntreprise) => {
    if (getError) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de l\'achat entreprise' });
    }
    if (!existingAchatEntreprise) {
      return res.status(404).json({ error: 'Achat entreprise non trouvé' });
    }
    existingAchatEntreprise.delete((deleteError) => {
      if (deleteError) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de l\'achat entreprise' });
      }
      return res.status(204).end();
    });
  });
};
}

module.exports = AchatEntrepriseController