const Rapports = require("../../models/rapports/rapports.model");

const fs = require("fs");

deleteFile = (file) => {
  fs.unlink(file, (error) => {
    if (error) {
      console.error("Erreur de la suppression du fichier :", error);
    } else {
      console.log("Fichier supprimé avec succès");
    }
  });
};

class RapportsController {
  // Créer un nouveau rapport
  static create = (req, res) => {
    let rapportDataf = req.body;
    const file = req.file;
    console.log("rapportDataf", rapportDataf);
    console.log("file", file);
    const rapportData = {
      id_employe: parseInt(rapportDataf.id_employe),
      rapport: file.path,
    };
    console.log("rapportData", rapportData);

    Rapports.create(rapportData, (error, rapport) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la création du rapport" });
      }
      return res.status(201).json({ status: 201, rapport: rapport });
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

  static getAllOfEmployee = (req, res) => {
    const employee_id = req.params.employee_id;
    //  console.log("employee_id in controller", employee_id);
    Rapports.getAllOfEmployee(employee_id, (error, rapports) => {
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
