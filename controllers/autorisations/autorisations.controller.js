const Autorisations = require("../../models/autorisations/autorisations.model");

class AutorisationsController {
  // Créer une nouvelle autorisation
  static create = (req, res) => {
    const autorisationData = req.body;
    Autorisations.create(autorisationData, (error, autorisation) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de l'autorisation" });
      }
      return res.status(201).json(autorisation);
    });
  };

  // Récupérer une autorisation par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Autorisations.getById(id, (error, autorisation) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'autorisation" });
      }
      if (!autorisation) {
        return res.status(404).json({ error: "Autorisation non trouvée" });
      }
      return res.status(200).json(autorisation);
    });
  };

  static getAll = (req, res) => {
    Autorisations.getAll((error, autorisations) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des autorisations" });
      }
      return res.status(200).json(autorisations);
    });
  };

  // Mettre à jour une autorisation par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Autorisations.getById(id, (getError, existingAutorisation) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'autorisation" });
      }
      if (!existingAutorisation) {
        return res.status(404).json({ error: "Autorisation non trouvée" });
      }
      existingAutorisation = { ...existingAutorisation, ...updatedData };
      existingAutorisation.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de l'autorisation" });
        }
        return res.status(200).json(existingAutorisation);
      });
    });
  };

  // Supprimer une autorisation par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Autorisations.getById(id, (getError, existingAutorisation) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'autorisation" });
      }
      if (!existingAutorisation) {
        return res.status(404).json({ error: "Autorisation non trouvée" });
      }
      existingAutorisation.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'autorisation" });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = AutorisationsController;
