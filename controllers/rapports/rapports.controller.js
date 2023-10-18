const Rapports = require("../../models/rapports/rapports.model");

class RapportsController {
  // Créer un nouveau rapport
  static create = (req, res) => {
    const rapportData = req.body;
    Rapports.create(rapportData, (error, rapport) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du rapport" });
      }
      return res.status(201).json(rapport);
    });
  };

  // Récupérer un rapport par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Rapports.getById(id, (error, rapport) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du rapport" });
      }
      if (!rapport) {
        return res.status(404).json({ error: "Rapport non trouvé" });
      }
      return res.status(200).json(rapport);
    });
  };

  static getAll = (req, res) => {
    Rapports.getAll((error, rapports) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des rapports" });
      }
      return res.status(200).json(rapports);
    });
  };

  // Mettre à jour un rapport par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Rapports.getById(id, (getError, existingRapport) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du rapport" });
      }
      if (!existingRapport) {
        return res.status(404).json({ error: "Rapport non trouvé" });
      }
      existingRapport = { ...existingRapport, ...updatedData };
      existingRapport.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du rapport" });
        }
        return res.status(200).json(existingRapport);
      });
    });
  };

  // Supprimer un rapport par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Rapports.getById(id, (getError, existingRapport) => {
      if (getError) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération du rapport" });
      }
      if (!existingRapport) {
        return res.status(404).json({ error: "Rapport non trouvé" });
      }
      existingRapport.delete((deleteError) => {
        if (deleteError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la suppression du rapport" });
        }
        return res.status(204).json();
      });
    });
  };
}

module.exports = RapportsController;
