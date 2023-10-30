const Depenses = require("../../models/depenses/depenses.model");
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
class DepensesController {
  // Créer une nouvelle dépense
  static create = (req, res) => {
    const depenseDataf = req.body;
    const file = req.file;
    console.log("depenseDataf", depenseDataf);
    console.log("file", file);
    const depenseData = {
      ...depenseDataf,
      piece: file ? file.path : "",
    };
    console.log("depenseData", depenseData);
    Depenses.create(depenseData, (error, depense) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création de la dépense",
        });
      }
      return res.status(201).json({ status: 201, depense: depense });
    });
  };

  // Récupérer une dépense par ID
  static getById = (req, res) => {
    const id = req.params.id;
    Depenses.getById(id, (error, depense) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la dépense" });
      }
      if (!depense) {
        return res.status(404).json({ error: "Dépense non trouvée" });
      }
      return res.status(200).json(depense);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAll(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  static getAllFromNewToOld = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAllFromNewToOld(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  static getAllFromOldToNew = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAll(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  static getAllMostImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAllMostImportant(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  static getAllLessImportant = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAllLessImportant(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  static getAllValidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAllValidated(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  static getAllUnvalidated = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    Depenses.getAllUnvalidated(startDate, endDate, (error, depenses) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des dépenses" });
      }
      return res.status(200).json(depenses);
    });
  };

  // Mettre à jour une dépense par ID
  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    Depenses.getById(id, (getError, existingDepense) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la dépense",
        });
      }
      if (!existingDepense) {
        return res
          .status(404)
          .json({ status: 404, error: "Dépense non trouvée" });
      }
      existingDepense = { ...existingDepense, ...updatedData };

      const file = req.file;
      console.log("existingDepense", existingDepense);
      console.log("file", file);
      if (file) {
        const lastSlip = existingDepense.piece;
        existingDepense = { ...existingDepense, piece: file.path };
        if (lastSlip != "") {
          deleteFile(lastSlip);
        }
      }
      existingDepense = new Depenses(
        existingDepense.id,
        existingDepense.description,
        existingDepense.montant,
        existingDepense.piece,
        existingDepense.est_validee,
        existingDepense.date_depense
      );
      existingDepense.update((updateError) => {
        if (updateError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la mise à jour de la dépense",
          });
        }
        return res.status(200).json({ status: 200, existingDepense });
      });
    });
  };

  // Supprimer une dépense par ID
  static delete = (req, res) => {
    const id = req.params.id;
    Depenses.getById(id, (getError, existingDepense) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la dépense",
        });
      }
      if (!existingDepense) {
        return res
          .status(404)
          .json({ status: 404, error: "Dépense non trouvée" });
      }
      existingDepense.delete((deleteError, id) => {
        if (!id) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression de la dépense",
          });
        }
        if (existingDepense.piece != "") {
          deleteFile(existingDepense.piece);
        }

        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = DepensesController;
