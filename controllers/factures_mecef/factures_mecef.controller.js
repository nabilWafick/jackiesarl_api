const { state } = require("../../models/_db/database");
const AchatClient = require("../../models/achat_client/achat_client.model");
const FacturesMECEF = require("../../models/factures_mecef/factures_mecef.model");

class FacturesMECEFController {
  static create(req, res) {
    const factureData = req.body;

    AchatClient.getById(factureData.id_achat, (achatError, achat) => {
      if (achatError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la création de la facture",
        });
      }

      if (!achat) {
        return res
          .status(404)
          .json({ status: 404, error: "Vente non retrouvée" });
      }

      FacturesMECEF.create(factureData, (error, newFacture) => {
        if (error) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la création de la facture",
          });
        }
        return res.status(201).json({ status: 201, factureMECEF: newFacture });
      });
    });
  }

  static getById = (req, res) => {
    const id = req.params.id;
    console.log("req.id", id);
    FacturesMECEF.getById(id, (error, facture) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération de la facture" });
      }
      if (!facture) {
        return res.status(404).json({ error: "Facture non trouvée" });
      }
      return res.status(200).json(facture);
    });
  };

  static getAll = (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    FacturesMECEF.getAll(startDate, endDate, (error, factures) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la récupération des brouillards" });
      }
      return res.status(200).json(factures);
    });
  };

  static update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    FacturesMECEF.getById(id, (getError, existingFacture) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la facture",
        });
      }
      if (!existingFacture) {
        return res
          .status(404)
          .json({ status: 404, error: "Facture non trouvée" });
      }

      //   console.log("existingFacture", existingFacture);

      existingFacture = {
        ...existingFacture,
        ...updatedData,
      };

      //   console.log("new employee data", existingFacture);
      existingFacture = new FacturesMECEF(
        existingFacture.id,
        existingFacture.id_achat,
        existingFacture.reference,
        existingFacture.fichier,
        existingFacture.date_facture
      );
      existingFacture.update((updateError) => {
        if (updateError) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour de la facture" });
        }
        return res.status(200).json({
          status: 200,
          factureMECEF: existingFacture,
        });
      });
    });
  };

  static delete = (req, res) => {
    const id = req.params.id;
    FacturesMECEF.getById(id, (getError, existingFacture) => {
      if (getError) {
        return res.status(500).json({
          status: 500,
          error: "Erreur lors de la récupération de la facture",
        });
      }
      if (!existingFacture) {
        return res
          .status(404)
          .json({ status: 404, error: "Facture non trouvée" });
      }
      existingFacture.delete((deleteError, id) => {
        if (deleteError) {
          return res.status(500).json({
            status: 500,
            error: "Erreur lors de la suppression de la facture",
          });
        }
        return res.status(204).json({ status: 204, id });
      });
    });
  };
}

module.exports = FacturesMECEFController;
