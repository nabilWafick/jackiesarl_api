const Creances = require("../../models/creances/creances.model");

class CreancesController {
  // Créer une nouvelle créance
  static create = (req, res) => {
    const creanceData = req.body;
    Creances.create(creanceData, (error, creance) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de la créance" });
      }
      return res.status(201).json(creance);
    });
  };

  // Récupérer une créance par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Creances.getById(id, (error, creance) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la créance" });
      }
      if (!creance) {
        return res.status(404).json({ error: "Créance non trouvée" });
      }
      return res.status(200).json(creance);
    });
  };

  static getAll = (req, res) => {
    Creances.getAll((error, creances) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des créances" });
      }
      return res.status(200).json(creances);
    });
  };

  // Mettre à jour une créance par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Creances.getById(id, (getError, existingCreance) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la créance" });
      }
      if (!existingCreance) {
        return res.status(404).json({ error: "Créance non trouvée" });
      }
      existingCreance = { ...existingCreance, ...updatedData };
      existingCreance.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de la créance" });
        }
        return res.status(200).json(existingCreance);
      });
    });
  };

  // Supprimer une créance par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Creances.getById(id, (getError, existingCreance) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la créance" });
      }
      if (!existingCreance) {
        return res.status(404).json({ error: "Créance non trouvée" });
      }
      existingCreance.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de la créance" });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = CreancesController;
