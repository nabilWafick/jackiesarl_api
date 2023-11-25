const Depenses = require("../../models/depenses/depenses.model");
const path = require("path");
const fs = require("fs");
const Modifications = require("../../models/modifications/modifications.model");

const deleteFile = (fileLink) => {
  //  console.log("file link in delete function", fileLink);
  const filePath = fileLink.split("http://127.0.0.1:7000/")[1];
  // console.log("file path after split", filePath);
  const directory = path.resolve(__dirname, "../..");
  const dir = path.join(directory, `/uploads/${filePath}`);

  fs.unlink(dir, (error) => {
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
    const needed_path = file && file && file.path.split("/uploads")[1];
    //console.log("needeed path", needed_path);
    const fileLink = file && file && `http://127.0.0.1:7000${needed_path}`;
    // console.log("file link", fileLink);
    const depenseData = {
      ...depenseDataf,
      montant: parseFloat(depenseDataf.montant),
      est_validee: parseInt(depenseDataf.est_validee),
      piece: file ? fileLink : "",
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
    let previousData = {};
    let newData = {};

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

      previousData = existingDepense;

      existingDepense = {
        ...existingDepense,
        ...updatedData,
        montant: parseFloat(updatedData.montant),
        est_validee: parseInt(updatedData.est_validee),
      };

      const file = req.file;
      console.log("existingDepense", existingDepense);
      console.log("file", file);
      if (file) {
        const needed_path = file && file.path.split("/uploads")[1];
        //console.log("needeed path", needed_path);
        const fileLink = file && `http://127.0.0.1:7000${needed_path}`;
        // console.log("file link", fileLink);
        const lastSlip = existingDepense.piece;
        existingDepense = { ...existingDepense, piece: fileLink };
        if (lastSlip != "") {
          deleteFile(lastSlip);
        }
      }

      newData = existingDepense;

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

        Modifications.create(
          {
            modification: `Modification des données d'une dépense`,
            details: `
              Anciennes données::
              Description: ${previousData.description},
              Montant: ${previousData.montant},
              Pièce: ${previousData.piece},
              État de validation: ${
                previousData.est_validee ? "Validée" : "Non Validée"
              }
              a57aa2b90d9bbb0524e51b458577767ab2823507b877e9aedfd885bb12b5d7ed980dd63abad043be6beff172d6c47678d68a502778a617e57b3e7fd0b0952f47
              Nouvelles données::
              Description: ${newData.description},
              Montant: ${newData.montant},
              Pièce: ${newData.piece},
              État de validation: ${
                newData.est_validee ? "Validée" : "Non Validée"
              }
              `,
            id_employe: req.employee.id,
          },
          (error, modification) => {}
        );

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
