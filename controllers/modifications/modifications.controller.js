const Modifications = require("../../models/modifications/modifications.model");

class ModificationsController {
  // Créer une nouvelle modification
  static create = (req, res) => {
    const modificationData = req.body;
    Modifications.create(modificationData, (error, modification) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de la modification" });
      }
      return res.status(201).json(modification);
    });
  };

  // Récupérer une modification par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Modifications.getById(id, (error, modification) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la modification" });
      }
      if (!modification) {
        return res.status(404).json({ error: "Modification non trouvée" });
      }
      return res.status(200).json(modification);
    });
  };

  static getAll = (req, res) => {
    Modifications.getAll((error, modifications) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des modifications" });
      }
      return res.status(200).json(modifications);
    });
  };

  // Mettre à jour une modification par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Modifications.getById(id, (getError, existingModification) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la modification" });
      }
      if (!existingModification) {
        return res.status(404).json({ error: "Modification non trouvée" });
      }
      existingModification = { ...existingModification, ...updatedData };
      existingModification.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({
              error: "Erreur lors de la mise à jour de la modification",
            });
        }
        return res.status(200).json(existingModification);
      });
    });
  };

  // Supprimer une modification par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Modifications.getById(id, (getError, existingModification) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la modification" });
      }
      if (!existingModification) {
        return res.status(404).json({ error: "Modification non trouvée" });
      }
      existingModification.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({
              error: "Erreur lors de la suppression de la modification",
            });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = ModificationsController;
