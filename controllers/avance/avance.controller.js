const Avance = require("../../models/avance/avance.model");

class AvanceController {
  // Créer une nouvelle avance
  static create = (req, res) => {
    const avanceData = req.body;
    Avance.create(avanceData, (error, avance) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création de l'avance" });
      }
      return res.status(201).json(avance);
    });
  };

  // Récupérer une avance par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Avance.getById(id, (error, avance) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'avance" });
      }
      if (!avance) {
        return res.status(404).json({ error: "Avance non trouvée" });
      }
      return res.status(200).json(avance);
    });
  };

  static getAll = (req, res) => {
    Avance.getAll((error, avances) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des avances" });
      }
      return res.status(200).json(avances);
    });
  };

  // Mettre à jour une avance par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Avance.getById(id, (getError, existingAvance) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'avance" });
      }
      if (!existingAvance) {
        return res.status(404).json({ error: "Avance non trouvée" });
      }
      existingAvance = { ...existingAvance, ...updatedData };
      existingAvance.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de l'avance" });
        }
        return res.status(200).json(existingAvance);
      });
    });
  };

  // Supprimer une avance par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Avance.getById(id, (getError, existingAvance) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de l'avance" });
      }
      if (!existingAvance) {
        return res.status(404).json({ error: "Avance non trouvée" });
      }
      existingAvance.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression de l'avance" });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = AvanceController;
